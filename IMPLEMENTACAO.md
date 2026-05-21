# Guia de Implementação — Cadê o Professor?

## Pré-requisitos

- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Conta Google com acesso ao projeto `cade-o-professor`

---

## 1. Restrição de Domínio na API Key (OBRIGATÓRIO)

> Esta é a única configuração de segurança que não pode ser feita via código.

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Selecione o projeto **cade-o-professor**
3. Clique na chave de API existente
4. Em **Restrições de aplicação** → selecione **Referenciadores HTTP**
5. Adicione:
   - `https://cade-o-professor.web.app/*`
   - `https://cade-o-professor.firebaseapp.com/*`
   - `http://localhost:5000/*` (para desenvolvimento local)
6. Salve

---

## 2. Ícones PWA (NECESSÁRIO)

O `manifest.json` aponta para `/icons/icon-192.png` e `/icons/icon-512.png`. Crie esses arquivos:

```bash
# Opção 1: Use uma ferramenta online
# https://realfavicongenerator.net/ ou https://www.pwabuilder.com/

# Opção 2: Com ImageMagick (se tiver instalado)
mkdir -p icons
convert logo.png -resize 192x192 icons/icon-192.png
convert logo.png -resize 512x512 icons/icon-512.png
```

Os ícones devem ser:
- Formato PNG
- Fundo não transparente (para `maskable`)
- Tamanhos: 192x192 e 512x512 pixels

---

## 3. Deploy

```bash
# Clone / pull o repositório
git pull origin main

# Login no Firebase (se necessário)
firebase login

# Selecione o projeto
firebase use cade-o-professor

# Deploy completo (hosting + firestore rules)
firebase deploy

# Ou só o hosting
firebase deploy --only hosting
```

---

## 4. Verificar headers de segurança

Após o deploy, verifique os headers:

```bash
curl -I https://cade-o-professor.web.app
```

Espere ver na resposta:
- `content-security-policy: default-src 'self'; ...`
- `x-frame-options: SAMEORIGIN`
- `x-content-type-options: nosniff`
- `permissions-policy: camera=(self), ...`

---

## 5. Verificar PWA

1. Abra o app em Chrome
2. DevTools → Lighthouse → Progressive Web App
3. Deve aparecer o botão "Instalar" na barra de endereço
4. No mobile: compartilhar → Adicionar à tela inicial

---

## 6. Verificar login mobile

1. Abra o app em um celular (Safari iOS ou Chrome Android)
2. Clique em **Entrar**
3. O fluxo deve redirecionar para a tela de login Google (não popup)
4. Após login, retorna ao app autenticado

---

## Desenvolvimento local

```bash
# Servidor local com Firebase
firebase serve --only hosting

# Acesse em: http://localhost:5000
```

> O Service Worker só funciona em HTTPS ou localhost. Não funciona em IPs locais (192.168.x.x).

---

*Ver também: [TESTES.md](./TESTES.md) | [RESUMO.md](./RESUMO.md)*
