# Checklist de Testes — Cadê o Professor?

> Use este checklist após cada deploy para validar todas as funcionalidades.

---

## 1. Autentição

### Desktop (Chrome/Firefox/Edge)
- [ ] Botão "Entrar" abre popup do Google
- [ ] Login com conta Google funciona
- [ ] Avatar e nome do usuário aparecem no header
- [ ] Badge correto: Admin / Professor / Visitante
- [ ] Botão "Sair" faz logout
- [ ] Após logout, estado retorna ao inicial

### Mobile (Safari iOS / Chrome Android)
- [ ] Botão "Entrar" redireciona para login Google (sem popup)
- [ ] Após login, retorna ao app autenticado
- [ ] Avatar e nome aparecem corretamente
- [ ] Logout funciona no mobile

---

## 2. PWA e Service Worker

- [ ] Chrome mostra botão "Instalar" na barra de endereço
- [ ] App instalável em Android ("Adicionar à tela inicial")
- [ ] App instalável em iOS (Safari → Compartilhar → Adicionar à tela inicial)
- [ ] Após instalação, abre como app standalone (sem barra do browser)
- [ ] DevTools → Application → Service Workers: status "activated and running"
- [ ] DevTools → Application → Manifest: sem erros
- [ ] Ícone correto aparece (192x192 e 512x512)
- [ ] `theme-color` azul (#2563eb) na barra de status do Android

---

## 3. Painel Principal

- [ ] Lista de professores em sala carrega em tempo real
- [ ] Contadores (Total / Em sala / Sem sala) corretos
- [ ] Busca por nome filtra corretamente
- [ ] Busca por disciplina filtra corretamente
- [ ] Estado "Nenhum professor em sala" aparece quando lista vazia
- [ ] Avatar com iniciais e cor correta para cada professor
- [ ] Tempo de alocação ("há X min") atualiza

---

## 4. Scanner QR Code

### Como Professor
- [ ] Painel do professor aparece após login
- [ ] Card de identificação com nome e disciplina exibido
- [ ] Botão "Iniciar Scanner" solicita permissão de câmera
- [ ] Scanner abre usando câmera traseira (mobile)
- [ ] Escaneamento de QR Code da sala funciona
- [ ] Alocação bem-sucedida mostra mensagem verde
- [ ] Tentar entrar na mesma sala exibe mensagem "já está na sala"
- [ ] Tentar mudar de sala exige confirmação (modal)
- [ ] Botão "Sair da sala" exibe modal de confirmação
- [ ] Sala ocupada por outro prof mostra modal bloqueio

### Como Admin
- [ ] Select de professor aparece no painel scanner
- [ ] Admin pode escanear em nome de qualquer professor
- [ ] Admin pode substituir professor em sala ocupada (modal)

---

## 5. Painel Admin

### Cadastro de Professor
- [ ] Formulário valida campos obrigatórios
- [ ] Não permite e-mail duplicado
- [ ] Professor aparece na lista após cadastro
- [ ] Botão "Excluir" exibe modal de confirmação
- [ ] Professor excluído sai da sala automaticamente

### Cadastro de Sala
- [ ] Sala criada aparece na lista
- [ ] Sala excluída remove alocação do professor

### Alocação Manual
- [ ] Select de professor e sala populados
- [ ] Alocação direta funciona (professor livre, sala livre)
- [ ] Confirmação quando sala já ocupada
- [ ] Confirmação quando professor já em outra sala
- [ ] "Liberar Todas as Salas" exige confirmação e funciona

---

## 6. QR Codes

- [ ] QR Codes de todas as salas renderizados
- [ ] Botão "Baixar" faz download do PNG
- [ ] Botão "Imprimir todos" abre diálogo de impressão
- [ ] QR Code escaneado pelo scanner retorna a sala correta

---

## 7. Histórico

- [ ] Movimentos de entrada/saída registrados
- [ ] Timestamps corretos (fuso horário Brasília)
- [ ] Lista em ordem decrescente (mais recente primeiro)
- [ ] Máximo de 50 registros exibidos

---

## 8. Segurança

- [ ] Usuário não logado não vê abas Admin
- [ ] Visitante (logado mas sem cadastro) não consegue alocar
- [ ] Professor só consegue alocar a si mesmo
- [ ] Firestore Rules bloqueiam escrita não autorizada

### Headers HTTP (após `firebase deploy`)
```bash
curl -I https://cade-o-professor.web.app | grep -i 'content-security\|x-frame\|x-content\|permissions'
```
- [ ] `Content-Security-Policy` presente
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Permissions-Policy` presente

---

## 9. Performance e UX

- [ ] App carrega em menos de 3s em conexão 4G
- [ ] Toasts de notificação aparecem e somem corretamente
- [ ] Modo escuro funciona (botão de tema)
- [ ] App responsívo em 320px (iPhone SE) e 390px (iPhone 14)
- [ ] Sem erros no console (DevTools)
- [ ] Service Worker registrado sem erros

---

*Ver também: [IMPLEMENTACAO.md](./IMPLEMENTACAO.md) | [RESUMO.md](./RESUMO.md)*
