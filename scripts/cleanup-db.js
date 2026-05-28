const admin = require('firebase-admin');

// Inicializa o Firebase Admin usando a chave da conta de serviço fornecida pelas secrets do GitHub
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanup() {
  console.log('Iniciando desalocação automática dos professores...');
  const salasRef = db.collection('salas');
  const snapshot = await salasRef.where('profId', '!=', null).get();

  if (snapshot.empty) {
    console.log('Nenhuma sala ocupada encontrada no momento.');
    return;
  }

  const batch = db.batch();
  const ts = admin.firestore.FieldValue.serverTimestamp();
  let count = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const profId = data.profId;

    // 1. Libera a sala
    batch.update(doc.ref, { profId: null });

    // 2. Tenta buscar o nome real do professor para registrar no histórico se possível
    let profNome = "Desalocação Automática";
    if (profId) {
      try {
        const profSnap = await db.collection('professores').doc(profId).get();
        if (profSnap.exists && profSnap.data().name) {
          profNome = profSnap.data().name;
        }
      } catch (err) {
        console.warn(`Aviso: Não foi possível obter o nome do professor ${profId}:`, err.message);
      }
    }

    // 3. Registra o movimento de saída no histórico
    const logRef = db.collection('historico').doc();
    batch.set(logRef, {
      profId: profId,
      profNome: profNome,
      salaId: doc.id,
      salaNome: data.name,
      acao: "saida",
      ts: ts
    });

    count++;
    console.log(`- Agendada liberação da sala: ${data.name} (Professor: ${profNome})`);
  }

  await batch.commit();
  console.log(`Sucesso: ${count} sala(s) liberada(s) com sucesso.`);
}

cleanup().catch(err => {
  console.error('Erro durante a execução da desalocação:', err);
  process.exit(1);
});
