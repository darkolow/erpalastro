# 📊 Estrutura do Banco de Dados - Alastro Manager

Este documento descreve em detalhes a estrutura das collections do Firestore.

---

## 🗄️ Collections

### 1. `products` - Produtos

**Descrição**: Armazena todos os produtos do catálogo.

**Estrutura**:
```typescript
{
  id: string,                    // ID único do documento
  name: string,                  // Nome do produto
  sku: string,                   // SKU único
  description: string,           // Descrição detalhada
  category: string,              // Categoria do produto
  
  // Precificação
  costPrice: number,             // Preço de custo (R$)
  desiredProfit: number,         // Lucro líquido desejado (R$)
  
  // Custos adicionais
  packagingCost: number,         // Custo de embalagem (R$)
  operationalCost: number,       // Custos operacionais (R$)
  
  // Dimensões e peso
  weight: number,                // Peso em kg
  length: number,                // Comprimento em cm
  width: number,                 // Largura em cm
  height: number,                // Altura em cm
  
  // Estoque
  totalStock: number,            // Estoque total atual
  minStock: number,              // Estoque mínimo (alerta)
  
  // Variações
  hasVariations: boolean,        // Tem variações?
  variations: [                  // Array de variações (opcional)
    {
      id: string,                // ID da variação
      name: string,              // Nome (ex: "P", "Azul")
      sku: string,               // SKU da variação
      stock: number,             // Estoque específico
      price?: number             // Preço diferente (opcional)
    }
  ],
  
  // Imagens
  images: string[],              // URLs no Firebase Storage
  
  // Preços por marketplace
  marketplacePrices: {
    mercado_livre: {
      price: number,             // Preço calculado/editado
      isActive: boolean,         // Publicado?
      calculatedProfit: number,  // Lucro real
      lastUpdated: Date         // Última atualização
    },
    amazon: { ... },
    shopee: { ... },
    shein: { ... },
    tiktok_shop: { ... }
  },
  
  // Metadata
  createdAt: Date,              // Data de criação
  updatedAt: Date               // Última atualização
}
```

**Índices recomendados**:
- `sku` (único)
- `category`
- `totalStock` (para alertas)
- `createdAt`

---

### 2. `orders` - Pedidos

**Descrição**: Registra todos os pedidos recebidos dos marketplaces.

**Estrutura**:
```typescript
{
  id: string,                    // ID único do documento
  orderNumber: string,           // Número do pedido no marketplace
  marketplace: Marketplace,      // Enum do marketplace
  
  // Cliente
  customerName: string,
  customerEmail?: string,
  customerPhone?: string,
  
  // Endereço
  shippingAddress: {
    street: string,
    number: string,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  },
  
  // Itens
  items: [
    {
      productId: string,         // Referência ao produto
      productName: string,
      sku: string,
      variationId?: string,
      variationName?: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number
    }
  ],
  
  // Valores
  subtotal: number,              // Soma dos itens
  shippingCost: number,          // Custo de frete
  discount: number,              // Desconto aplicado
  total: number,                 // Total final
  
  // Custos e lucro
  marketplaceFees: number,       // Total de taxas
  netProfit: number,             // Lucro líquido
  
  // Status
  status: OrderStatus,           // Enum do status
  fulfillmentMethod: FulfillmentMethod, // Método de envio
  
  // Tracking
  trackingCode?: string,         // Código de rastreio
  
  // Datas
  orderDate: Date,               // Data do pedido
  separationDate?: Date,         // Data de separação
  shippingDate?: Date,           // Data de envio
  deliveryDate?: Date,           // Data de entrega
  
  // Metadata
  notes?: string,                // Observações
  createdAt: Date,
  updatedAt: Date
}
```

**Índices recomendados**:
- `orderNumber` (único)
- `marketplace`
- `status`
- `orderDate`
- Composto: `marketplace + orderDate`
- Composto: `status + orderDate`

---

### 3. `marketplace_fees` - Taxas dos Marketplaces

**Descrição**: Armazena as taxas de cada marketplace (editáveis).

**Estrutura**:
```typescript
{
  id: string,                    // ID único
  marketplace: Marketplace,      // Enum do marketplace
  
  // Taxas variáveis (%)
  commissionPercentage: number,  // Comissão do marketplace
  paymentFeePercentage: number,  // Taxa de pagamento
  
  // Taxas fixas (R$)
  fixedFeePerItem?: number,      // Taxa fixa por item
  
  // Fulfillment
  fulfillmentFeePercentage?: number,
  fulfillmentFeeFixed?: number,
  
  // Frete
  averageShippingCost: number,   // Custo médio de frete
  
  // Metadata
  category?: string,             // Para taxas por categoria
  lastUpdated: Date,
  isManuallySet: boolean         // Editado manualmente?
}
```

**Índices recomendados**:
- `marketplace` (único se não houver categorias)
- Composto: `marketplace + category`

---

### 4. `users` - Usuários (Futuro)

**Descrição**: Dados complementares dos usuários (além do Firebase Auth).

**Estrutura**:
```typescript
{
  id: string,                    // Mesmo ID do Firebase Auth
  email: string,
  name: string,
  role: UserRole,                // admin, sales, stock, financial
  isActive: boolean,
  createdAt: Date,
  lastLogin?: Date
}
```

---

## 🔒 Regras de Segurança (Firestore Rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Produtos: apenas usuários autenticados
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      // TODO: Adicionar verificação de role (apenas admin/stock)
    }
    
    // Pedidos: apenas usuários autenticados
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      // TODO: Adicionar verificação de role
    }
    
    // Taxas: apenas admin pode editar
    match /marketplace_fees/{feeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      // TODO: Adicionar verificação de role admin
    }
    
    // Usuários: apenas admin
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null;
      // TODO: Adicionar verificação de role admin
    }
  }
}
```

---

## 📈 Queries Comuns

### Produtos com estoque baixo
```typescript
const lowStockProducts = await getDocs(
  query(
    collection(db, 'products'),
    where('totalStock', '<=', 'minStock'),
    orderBy('totalStock', 'asc')
  )
);
```

### Pedidos do dia por marketplace
```typescript
const today = new Date();
today.setHours(0, 0, 0, 0);

const todayOrders = await getDocs(
  query(
    collection(db, 'orders'),
    where('marketplace', '==', 'mercado_livre'),
    where('orderDate', '>=', today),
    orderBy('orderDate', 'desc')
  )
);
```

### Produtos por categoria
```typescript
const products = await getDocs(
  query(
    collection(db, 'products'),
    where('category', '==', 'Eletrônicos'),
    orderBy('name', 'asc')
  )
);
```

### Pedidos pendentes
```typescript
const pendingOrders = await getDocs(
  query(
    collection(db, 'orders'),
    where('status', 'in', ['received', 'awaiting_separation']),
    orderBy('orderDate', 'asc')
  )
);
```

---

## 🎯 Melhores Práticas

### 1. Sempre use timestamps
```typescript
createdAt: serverTimestamp(),
updatedAt: serverTimestamp()
```

### 2. Normalize quando necessário
- Evite duplicar dados que mudam frequentemente
- Use referências (`productId`) em vez de copiar objetos completos
- Desnormalize para otimizar leituras (ex: `productName` no pedido)

### 3. Use sub-collections para dados relacionados
```typescript
products/{productId}/price_history/{historyId}
orders/{orderId}/status_history/{historyId}
```

### 4. Implemente soft delete
```typescript
{
  isDeleted: false,
  deletedAt?: Date
}
```

### 5. Valide no client e no server
- Use TypeScript para validação no client
- Use Cloud Functions para validações críticas

---

## 🚀 Inicialização do Banco

### Script para popular taxas iniciais:

```typescript
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultMarketplaceFees } from '@/lib/pricing';

async function initializeMarketplaceFees() {
  for (const fee of defaultMarketplaceFees) {
    await setDoc(doc(collection(db, 'marketplace_fees')), {
      ...fee,
      id: doc(collection(db, 'marketplace_fees')).id,
      lastUpdated: new Date(),
    });
  }
  console.log('Taxas inicializadas!');
}
```

---

**Última atualização**: Outubro 2025
