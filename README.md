# Cadê o Professor? 📍

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![QR Code](https://img.shields.io/badge/QR%20Code-000000?style=for-the-badge&logo=qrcode&logoColor=white) ![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

## 📋 Sobre o Projeto

Aplicativo web de **localização de professores em tempo real via QR Code**, desenvolvido para escolas públicas com foco em agilidade e transparência na comunicação entre professores e alunos. Desenvolvido como ferramenta de gestão escolar para a **Escola Estadual Joaquim Diégues**, em Viçosa, Alagoas.

O projeto surgiu da necessidade prática de eliminar a comunicação manual sobre a localização dos docentes: professores escaneiam o QR Code fixado na porta da sala e ficam automaticamente **visíveis e alocados** para os alunos, em tempo real.

## ✨ Funcionalidades

### 📱 Leitura de QR Code por Sala

- **Scanner integrado**: Leitura via câmera do dispositivo (celular, tablet ou computador)
- **Alocação instantânea**: Professor vinculado à sala em tempo real após a leitura
- **Modo manual**: Alocação sem câmera para dispositivos com restrição de acesso
- **Desalocação**: Professor pode sair da sala com um clique

### 🗺️ Painel de Localização

- **Visão geral em tempo real**: Todos os professores e suas salas atuais
- **Indicadores visuais**: Status verde (presente) e cinza (não alocado)
- **Estatísticas rápidas**: Total de professores, alocados e disponíveis
- **Quadro de situação**: Atualização automática da localização docente

### 🎨 Interface e Design

- **Design Responsivo**: Adapta-se perfeitamente a smartphones, tablets e desktops
- **Tema Escuro/Claro**: Alternância entre modos visual claro e escuro
- **Animações Suaves**: Transições e feedbacks visuais intuitivos
- **Tipografia Otimizada**: Fontes legíveis e hierarquia visual clara

### 🏫 Gestão Escolar

- **Cadastro de Professores**: Nome, disciplina e avatar com iniciais gerado automaticamente
- **Cadastro de Salas**: Gerenciamento das salas de aula (13 salas pré-cadastradas)
- **Geração de QR Codes**: QR Code único por sala, gerado automaticamente
- **Impressão em lote**: Todos os QR Codes prontos para imprimir e fixar nas portas

### ♿ Acessibilidade

- **Semântica HTML**: Estrutura acessível com papéis e regiões bem definidos
- **Navegação por Teclado**: Suporte completo à navegação sem mouse
- **ARIA Labels**: Rótulos para leitores de tela
- **Contraste de Cores**: Cores com contraste adequado para leitura confortável

## 🗺️ Fluxo do Sistema

### Para o Professor

1. **Abre o app** — via link no smartphone (sem necessidade de instalação)
2. **Seleciona seu nome** — na lista de professores cadastrados
3. **Aponta a câmera** — para o QR Code fixado na porta da sala
4. **Fica alocado automaticamente** — os alunos já podem ver onde ele está
5. **Ao sair**, clica em "Sair da sala" — status atualizado instantaneamente

### Para o Aluno

1. **Acessa o painel** — via link compartilhado pela escola
2. **Visualiza o quadro de professores** — com indicação de sala em tempo real
3. **Sabe exatamente onde cada professor está** — sem precisar perguntar

### Para a Coordenação

1. **Cadastra professores e salas** — via painel administrativo
2. **Gera e imprime os QR Codes** — para fixar nas portas
3. **Acompanha a ocupação das salas** — em tempo real

## 🚀 Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS, Flexbox e Grid Layout
- **JavaScript ES6+**: Lógica de interação, scanner e geração de QR Codes
- **Firebase Auth**: Autenticação via Google com redirecionamento OAuth
- **Firebase Firestore**: Banco de dados em tempo real
- **Html5QrcodeScanner**: Leitura de QR Code via câmera do dispositivo
- **QRCode.js**: Geração de QR Codes únicos por sala

### Infraestrutura

- **Deploy na nuvem**: Hospedagem via GitHub Pages
- **HTTPS**: Comunicação segura e necessária para acesso à câmera
- **Zero dependências de servidor**: Roda 100% no navegador

## 💻 Estrutura do Projeto

```
cade-o-professor/
│
├── index.html           # Aplicação principal (SPA)
├── README.md            # Documentação do projeto
└── .gitignore           # Arquivos ignorados pelo git
```

## 🚀 Como Usar

### Acesso Online

O projeto está disponível em: `https://alexandrehenriqueventura.github.io/cade-o-professor`

> Qualquer dispositivo com navegador moderno e câmera consegue utilizar o app.

## 📄 Licença

Este projeto não possui uma licença específica definida. É uma ferramenta de gestão educacional desenvolvida para uso institucional.

## 📞 Contato

**Alexandre Henrique Ventura**

- Email: alexandrehenrique.ventura@gmail.com
- GitHub: [@alexandrehenriqueventura](https://github.com/alexandrehenriqueventura)

**Instituição**

- Escola Estadual Joaquim Diégues
- Viçosa, Alagoas, Brasil

---

**Desenvolvido com ❤️ para simplificar a gestão escolar pública**
