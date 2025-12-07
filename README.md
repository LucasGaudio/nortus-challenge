# Plataforma Nortus – Painel Interno

Este projeto é um painel interno desenvolvido para a Nortus, com módulos de gestão, simulação, chat assistido por IA e fluxo completo de autenticação.  
A aplicação foi construída utilizando **Next.js**, **React**, **TypeScript**, **Tailwind CSS** e integrações REST com o backend oficial da Nortus.

---

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript 5** - Tipagem estática

### Estilização
- **Tailwind CSS 4** - Framework CSS utility-first
- **ApexCharts** - Biblioteca de gráficos e visualizações

### Estado e Dados
- **Zustand** - Gerenciamento de estado global leve
- **Axios** - Cliente HTTP para requisições à API
- **React Hook Form** - Gerenciamento de formulários

### Utilitários
- **Zod** - Validação de schemas TypeScript-first
- **js-cookie** - Manipulação de cookies
- **OpenLayers (ol)** - Biblioteca para mapas interativos
- **Sonner** - Sistema de notificações toast

---

## 📂 Arquitetura e Estrutura

A estrutura segue uma abordagem modular e escalável, organizada por domínio e responsabilidade:

```
nortus-challenge/
├── app/                      # Next.js App Router
│   ├── auth/login/          # Página e layout de autenticação
│   ├── dashboard/           # Dashboard com KPIs e gráficos
│   ├── tickets/             # Gestão de tickets
│   ├── simulator/           # Simulador de planos
│   ├── chat/                # Chat assistido por IA
│   ├── layout.tsx           # Layout raiz da aplicação
│   └── page.tsx             # Página inicial (redirecionamento)
│
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI reutilizáveis
│   ├── layout/              # Componentes de layout (Sidebar, Topbar, PageLayout)
│   ├── chat/                # Componentes específicos do chat
│   ├── dashboard/           # Componentes do dashboard
│   ├── simulator/           # Componentes do simulador
│   └── tickets/             # Componentes de tickets
│
├── hooks/                   # Custom hooks React
│   ├── useChat.ts
│   ├── useCreateTicket.ts
│   ├── useProtectedRoute.ts
│   ├── useSimulator.ts
│   └── useSimulatorState.ts
│
├── lib/                     # Lógica de negócio e utilitários
│   ├── services/            # Camada de serviços da API
│   │   ├── auth.service.ts
│   │   ├── chat.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── simulator.service.ts
│   │   └── tickets.service.ts
│   ├── utils/               # Funções utilitárias
│   │   ├── calcPlanValue.ts
│   │   └── geocode.ts
│   ├── api.ts               # Instância Axios configurada
│   └── auth.ts              # Helpers de autenticação
│
├── store/                   # Estado global (Zustand)
│   ├── useAuthStore.ts
│   └── zustand-provider.tsx
│
├── types/                   # Definições TypeScript
│   ├── index.ts             # Tipos de domínio
│   └── api.ts               # Tipos de resposta da API
│
└── public/                  # Arquivos estáticos
    └── images/              # Imagens e assets
```

### Princípios de Organização

- **Separação de responsabilidades**: Cada camada tem uma responsabilidade clara
- **Reutilização**: Componentes e hooks são projetados para serem reutilizáveis
- **Type Safety**: 100% de cobertura TypeScript, sem tipos `any`
- **Manutenibilidade**: Estrutura clara facilita a manutenção e evolução

---

## 🧠 Funcionalidades Principais

### 🔐 Autenticação
- Fluxo completo de login com validação
- Persistência de sessão via cookies e Zustand
- Verificação automática de sessão na rota raiz
- Redirecionamento inteligente entre `/` e `/login`
- Interceptores Axios para gerenciamento automático de tokens
- Logout automático em caso de token inválido (401)

### 📊 Dashboard
- Visualização de KPIs em tempo real (ARPU, Conversão, Retenção, Churn)
- Gráficos interativos com ApexCharts
- Mapa de clientes ativos com OpenLayers
- Dados consumidos do endpoint `/nortus-v1/dashboard`

### 🎫 Gestão de Tickets
- Listagem completa de tickets com paginação
- Filtros por status e prioridade
- Modal para criação de novos tickets
- Cards de resumo com estatísticas
- UI fiel ao design do Figma
- Consumo do endpoint `/tickets`

### 📊 Simulador de Planos
- Renderização dinâmica dos planos retornados pela API
- Cálculo de valores em tempo real
- Indicadores visuais de cobertura e benefícios
- Sliders interativos para ajuste de parâmetros
- Consumo do endpoint `/nortus-v1/simulador-planos`

### 💬 Chat e Assistente Virtual
- Interface de chat em tempo real
- Renderização de mensagens por autor (usuário, assistente, IA)
- Sugestões automáticas da IA
- Input com validação e feedback visual
- Dados recebidos por `/nortus-v1/chat`

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (opcional, a API padrão será usada se não configurado):

```env
NEXT_PUBLIC_API_BASE=https://nortus-challenge.api.stage.loomi.com.br
```

### 3. Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### 4. Build para produção

```bash
npm run build
npm start
```

### 5. Linting

```bash
npm run lint
```

---

## 🔧 Configuração da API

A aplicação utiliza uma instância Axios centralizada (`lib/api.ts`) com as seguintes configurações:

- **Base URL**: Configurável via `NEXT_PUBLIC_API_BASE` (padrão: `https://nortus-challenge.api.stage.loomi.com.br`)
- **Timeout**: 15 segundos
- **Interceptors**: 
  - Request: Adiciona automaticamente o token de autenticação
  - Response: Trata erros 401 (não autorizado) com logout automático

---

## 📝 Estrutura de Serviços

A aplicação utiliza uma camada de serviços bem definida:

- **`auth.service.ts`**: Autenticação e gerenciamento de sessão
- **`tickets.service.ts`**: CRUD de tickets
- **`dashboard.service.ts`**: Dados do dashboard
- **`chat.service.ts`**: Comunicação com o chat
- **`simulator.service.ts`**: Simulação de planos

Todos os serviços seguem o mesmo padrão de interface e tratamento de erros.

---

## 🎨 Padrões e Convenções

### Nomenclatura
- **Componentes**: PascalCase (ex: `Sidebar`, `Topbar`)
- **Hooks**: camelCase com prefixo `use` (ex: `useChat`, `useSimulator`)
- **Serviços**: camelCase com sufixo `.service.ts` (ex: `auth.service.ts`)
- **Types**: PascalCase (ex: `Ticket`, `User`, `DashboardData`)
- **Funções**: camelCase (ex: `calcPlanValue`, `geocode`)

### Exports
- Componentes utilizam **named exports** para melhor tree-shaking
- Types são centralizados em `types/`

### TypeScript
- 100% de cobertura TypeScript
- Sem uso de tipos `any`
- Interfaces bem definidas para todas as props e retornos

---

## 🚀 O que faria diferente com mais tempo ou em um contexto real de projeto

### Testes e Qualidade de Código

1. **Testes automatizados**
   - Testes unitários para hooks e utilitários (Jest + React Testing Library)
   - Testes de integração para fluxos críticos (autenticação, criação de tickets)
   - Testes E2E para principais jornadas do usuário (Playwright ou Cypress)
   - Cobertura mínima de 80% para código crítico

2. **Validação e Linting mais rigoroso**
   - Configuração de ESLint mais restritiva
   - Pre-commit hooks com Husky para garantir qualidade antes do commit
   - Integração contínua (CI/CD) com validação automática

### Performance e Otimização

3. **Otimizações de performance**
   - Implementação de React.memo em componentes pesados
   - Lazy loading de rotas e componentes grandes
   - Virtualização de listas longas (react-window) na tabela de tickets
   - Code splitting mais agressivo
   - Otimização de imagens com next/image
   - Implementação de Service Workers para cache offline

4. **Gerenciamento de estado mais robusto**
   - Implementação de React Query ou SWR para cache de dados da API
   - Otimistic updates em operações CRUD
   - Retry automático em falhas de rede
   - Sincronização de estado entre abas (BroadcastChannel API)

### Experiência do Usuário

5. **Melhorias de UX/UI**
   - Loading skeletons ao invés de spinners simples
   - Error boundaries para tratamento elegante de erros
   - Feedback visual mais rico (animações, transições)
   - Modo escuro/claro configurável
   - Acessibilidade (ARIA labels, navegação por teclado, screen readers)
   - Responsividade aprimorada para mobile

6. **Funcionalidades avançadas**
   - Busca e filtros mais sofisticados (busca full-text, filtros combinados)
   - Exportação de dados (CSV, PDF)
   - Notificações em tempo real (WebSockets ou Server-Sent Events)
   - Histórico de ações do usuário
   - Sistema de permissões e roles (RBAC)

### Segurança

7. **Segurança aprimorada**
   - Refresh tokens com rotação automática
   - Rate limiting no frontend
   - Sanitização de inputs para prevenir XSS
   - Content Security Policy (CSP) headers
   - Validação de dados com Zod em todos os formulários
   - Proteção CSRF para operações sensíveis

### Arquitetura e Escalabilidade

8. **Arquitetura mais robusta**
   - Implementação de um design system completo (Storybook)
   - Padronização de componentes UI reutilizáveis (Button, Input, Modal, etc.)
   - Estrutura de monorepo se o projeto crescer (Turborepo ou Nx)
   - Separação clara entre lógica de negócio e apresentação
   - Implementação de padrão Repository para abstração de dados

9. **Observabilidade e Monitoramento**
   - Integração com ferramentas de monitoramento (Sentry, LogRocket)
   - Analytics de uso (Google Analytics, Mixpanel)
   - Logging estruturado
   - Métricas de performance (Web Vitals)
   - Alertas para erros críticos

### DevOps e Deploy

10. **Pipeline de deploy**
    - CI/CD completo (GitHub Actions, GitLab CI, ou similar)
    - Ambientes separados (dev, staging, production)
    - Deploy automatizado com rollback em caso de falha
    - Versionamento semântico
    - Dockerização da aplicação
    - Infraestrutura como código (Terraform, CloudFormation)

### Documentação

11. **Documentação técnica**
    - Documentação de API com OpenAPI/Swagger
    - Storybook para documentação de componentes
    - Guias de contribuição e padrões de código
    - Diagramas de arquitetura (C4 Model)
    - Documentação de decisões arquiteturais (ADRs)

### Internacionalização

12. **Suporte multi-idioma**
    - Implementação de i18n (next-intl ou react-i18next)
    - Formatação de datas, números e moedas por locale
    - RTL support para idiomas árabes

### Integração e APIs

13. **Melhorias na integração**
    - Implementação de retry com exponential backoff
    - Circuit breaker pattern para APIs externas
    - Cache inteligente com invalidação estratégica
    - Webhooks para eventos assíncronos
    - GraphQL se a API suportar (para queries mais eficientes)

---

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
