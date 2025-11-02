// ============================================
// TIPOS DE MARKETPLACES
// ============================================

export enum Marketplace {
  MERCADO_LIVRE = 'mercado_livre',
  AMAZON = 'amazon',
  SHOPEE = 'shopee',
  SHEIN = 'shein',
  TIKTOK_SHOP = 'tiktok_shop',
}

export const marketplaceLabels: Record<Marketplace, string> = {
  [Marketplace.MERCADO_LIVRE]: 'Mercado Livre',
  [Marketplace.AMAZON]: 'Amazon',
  [Marketplace.SHOPEE]: 'Shopee',
  [Marketplace.SHEIN]: 'Shein',
  [Marketplace.TIKTOK_SHOP]: 'TikTok Shop',
};

// ============================================
// PRODUTOS
// ============================================

export interface ProductVariation {
  id: string;
  name: string; // Ex: "P", "M", "G" ou "Azul", "Vermelho"
  sku: string;
  stock: number;
  price?: number; // Preço específico se diferente do produto principal
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  
  // Precificação
  costPrice: number; // Preço de custo
  desiredProfit: number; // Lucro líquido desejado
  
  // Custos operacionais
  packagingCost: number;
  operationalCost: number;
  
  // Dimensões e peso
  weight: number; // em kg
  length: number; // em cm
  width: number; // em cm
  height: number; // em cm
  
  // Estoque
  totalStock: number;
  minStock: number; // Alerta de estoque mínimo
  
  // Variações
  hasVariations: boolean;
  variations?: ProductVariation[];
  
  // Imagens
  images: string[]; // URLs das imagens no Firebase Storage
  
  // Preços por marketplace (calculados ou editados manualmente)
  marketplacePrices: {
    [key in Marketplace]?: {
      price: number;
      isActive: boolean; // Se o produto está publicado neste marketplace
      calculatedProfit: number; // Lucro real após taxas
      lastUpdated: Date;
    };
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// TAXAS DOS MARKETPLACES
// ============================================

export interface MarketplaceFees {
  id: string;
  marketplace: Marketplace;
  
  // Taxas variáveis
  commissionPercentage: number; // Taxa de comissão (%)
  paymentFeePercentage: number; // Taxa de pagamento (%)
  
  // Taxas fixas
  fixedFeePerItem?: number; // Taxa fixa por item (ex: Amazon)
  
  // Fulfillment
  fulfillmentFeePercentage?: number; // Taxa de fulfillment (%)
  fulfillmentFeeFixed?: number; // Taxa fixa de fulfillment
  
  // Custos de envio estimados
  averageShippingCost: number;
  
  // Metadata
  category?: string; // Algumas taxas variam por categoria
  lastUpdated: Date;
  isManuallySet: boolean; // Se foi editado manualmente
}

// ============================================
// PEDIDOS
// ============================================

export enum OrderStatus {
  RECEIVED = 'received',
  AWAITING_SEPARATION = 'awaiting_separation',
  SEPARATED = 'separated',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.RECEIVED]: 'Recebido',
  [OrderStatus.AWAITING_SEPARATION]: 'Aguardando Separação',
  [OrderStatus.SEPARATED]: 'Separado',
  [OrderStatus.SHIPPED]: 'Enviado',
  [OrderStatus.DELIVERED]: 'Entregue',
  [OrderStatus.CANCELLED]: 'Cancelado',
};

export enum FulfillmentMethod {
  FBA = 'fba', // Amazon FBA
  MERCADO_ENVIOS_FULL = 'mercado_envios_full',
  SHOPEE_LOGISTICS = 'shopee_logistics',
  SELF_FULFILLMENT = 'self_fulfillment', // Envio próprio
  OTHER = 'other',
}

export const fulfillmentMethodLabels: Record<FulfillmentMethod, string> = {
  [FulfillmentMethod.FBA]: 'Amazon FBA',
  [FulfillmentMethod.MERCADO_ENVIOS_FULL]: 'Mercado Envios Full',
  [FulfillmentMethod.SHOPEE_LOGISTICS]: 'Shopee Logistics',
  [FulfillmentMethod.SELF_FULFILLMENT]: 'Envio Próprio',
  [FulfillmentMethod.OTHER]: 'Outro',
};

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  variationId?: string;
  variationName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string; // Número do pedido no marketplace
  marketplace: Marketplace;
  
  // Cliente
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  
  // Endereço de entrega
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Itens do pedido
  items: OrderItem[];
  
  // Valores
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  
  // Taxas e custos
  marketplaceFees: number; // Comissões do marketplace
  netProfit: number; // Lucro líquido
  
  // Status e fulfillment
  status: OrderStatus;
  fulfillmentMethod: FulfillmentMethod;
  
  // Tracking
  trackingCode?: string;
  
  // Datas
  orderDate: Date;
  separationDate?: Date;
  shippingDate?: Date;
  deliveryDate?: Date;
  
  // Metadata
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// USUÁRIOS E PERMISSÕES
// ============================================

export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
  STOCK = 'stock',
  FINANCIAL = 'financial',
}

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.SALES]: 'Vendas',
  [UserRole.STOCK]: 'Estoque',
  [UserRole.FINANCIAL]: 'Financeiro',
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// ============================================
// DASHBOARD E RELATÓRIOS
// ============================================

export interface DashboardStats {
  date: Date;
  
  // Vendas por marketplace
  salesByMarketplace: {
    [key in Marketplace]?: {
      orders: number;
      revenue: number;
      profit: number;
    };
  };
  
  // Totais do dia
  totalOrders: number;
  totalRevenue: number;
  totalProfit: number;
  
  // Produtos com estoque baixo
  lowStockProducts: number;
  
  // Pedidos pendentes
  pendingOrders: number;
}
