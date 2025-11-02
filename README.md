# 🚀 Alastro Manager - Sistema de Gestão de E-commerce

Sistema completo para gestão de produtos, pedidos e finanças em múltiplos marketplaces (Amazon, Mercado Livre, Shopee, Shein, TikTok Shop).

## 📋 Visão Geral

**Alastro Manager** é um ERP customizado desenvolvido especificamente para atender as necessidades da empresa ALASTRO, que opera em múltiplos marketplaces. O sistema oferece funcionalidades especializadas que ERPs genéricos não conseguem fornecer.

### ✨ Funcionalidades Principais

- 📦 **Gestão de Produtos**: Cadastro completo com variações, controle de estoque e calculadora inteligente de preços
- 🛍️ **Gestão de Pedidos**: Acompanhamento de pedidos com status e integração com fulfillment
- 💰 **Gestão Financeira**: Cálculo automático de taxas, margem de lucro e relatórios por marketplace
- 🔐 **Sistema de Autenticação**: Login seguro com Firebase Authentication
- 📊 **Dashboard Analytics**: Visão consolidada de vendas, lucros e métricas importantes

---

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna e responsiva
- **shadcn/ui** - Componentes UI elegantes e acessíveis
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos e visualizações

### Backend/Database
- **Firebase**
  - **Firestore** - Banco de dados NoSQL
  - **Authentication** - Autenticação de usuários
  - **Storage** - Armazenamento de imagens
  - **Hosting** - Deploy e hospedagem

---

## 🚀 Como Começar

### 1️⃣ Pré-requisitos

- **Node.js** 18+ instalado
- Conta no **Firebase** (gratuita)
- Editor de código (recomendado: VS Code)

### 2️⃣ Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto (ou use existente)
3. Ative os seguintes serviços:
   - **Authentication** (método: Email/Password)
   - **Firestore Database** (modo teste inicialmente)
   - **Storage** (para imagens de produtos)
4. Copie as credenciais do projeto:
   - Vá em **Configurações do Projeto** → **Seus aplicativos** → **Web**
   - Copie as credenciais do `firebaseConfig`

### 3️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` com suas credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu-measurement-id
```

### 4️⃣ Instalar Dependências

```bash
npm install
```

### 5️⃣ Criar Primeiro Usuário

No Firebase Console:
1. Vá em **Authentication** → **Users**
2. Clique em **Add user**
3. Digite seu email e senha
4. Este será seu usuário admin

### 6️⃣ Rodar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 💡 Funcionalidades Principais

### 🔐 Autenticação
- Login com email/senha via Firebase Auth
- Proteção de rotas (usuários não autenticados são redirecionados)
- Logout seguro

### 📊 Dashboard
- Visão geral de vendas do dia
- Cards por marketplace mostrando:
  - Número de pedidos
  - Faturamento bruto
  - Lucro líquido
- Alertas de estoque baixo
- Pedidos pendentes

### 📦 Calculadora de Preços (Diferencial!)
Sistema inteligente que:
1. Recebe: Custo do produto + Lucro desejado
2. Considera: Taxas do marketplace + Custos operacionais + Frete
3. Calcula: Preço de venda ideal para atingir o lucro desejado
4. Permite: Edição manual dos preços sugeridos
5. Exibe: Margem de lucro real por marketplace

**Fórmula:**
```
Preço = (Custos + Lucro Desejado + Taxas Fixas) / (1 - Taxas%)
```

### 📈 Taxas dos Marketplaces (2025)

| Marketplace | Comissão | Taxa Pagamento | Taxa Fixa | Fulfillment |
|-------------|----------|----------------|-----------|-------------|
| Mercado Livre | 14.5% | 5.0% | - | - |
| Amazon | 12.0% | incluído | R$ 4,00 | 15% (FBA) |
| Shopee | 14.0% | 2.5% | - | - |
| Shein | 12.5% | incluído | - | - |
| TikTok Shop | 5.0% | 2.5% | - | - |

*Taxas editáveis no sistema*

---

## 🔄 Próximos Passos (Roadmap)

### Fase 1 - MVP ✅
- [x] Setup do projeto
- [x] Autenticação
- [x] Dashboard básico
- [x] Estrutura de dados

### Fase 2 - Produtos (A Desenvolver)
- [ ] CRUD completo de produtos
- [ ] Sistema de variações (P/M/G, cores)
- [ ] Upload de imagens
- [ ] Calculadora de preços por marketplace
- [ ] Controle de estoque
- [ ] Alertas de estoque mínimo

### Fase 3 - Pedidos (A Desenvolver)
- [ ] Listagem de pedidos
- [ ] Filtros (marketplace, status, data)
- [ ] Fluxo de status
- [ ] Desconto automático de estoque
- [ ] Integração com métodos de fulfillment

### Fase 4 - Financeiro (A Desenvolver)
- [ ] Relatórios de vendas
- [ ] Análise de lucro por produto
- [ ] Análise de lucro por marketplace
- [ ] Gestão de taxas
- [ ] Gráficos e visualizações

### Fase 5 - Integrações (Futuro)
- [ ] API Mercado Livre
- [ ] API Amazon
- [ ] API Shopee
- [ ] API TikTok Shop
- [ ] Sincronização automática de pedidos
- [ ] Sincronização de estoque

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar versão de produção
npm start

# Lint (verificar código)
npm run lint
```

---

## 📚 Recursos e Documentação

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
