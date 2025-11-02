import { Marketplace, MarketplaceFees } from '@/types';

/**
 * Taxas padrão dos marketplaces (atualizadas em 2025)
 * Estas taxas podem ser editadas manualmente no sistema
 */
export const defaultMarketplaceFees: Omit<MarketplaceFees, 'id' | 'lastUpdated'>[] = [
  {
    marketplace: Marketplace.MERCADO_LIVRE,
    commissionPercentage: 14.5, // Média das categorias
    paymentFeePercentage: 5.0, // Mercado Pago
    averageShippingCost: 15.0,
    fulfillmentFeePercentage: 0,
    isManuallySet: false,
  },
  {
    marketplace: Marketplace.AMAZON,
    commissionPercentage: 12.0, // Média das categorias
    paymentFeePercentage: 0, // Já incluído na comissão
    fixedFeePerItem: 4.0,
    fulfillmentFeePercentage: 15.0, // FBA (opcional)
    averageShippingCost: 20.0,
    isManuallySet: false,
  },
  {
    marketplace: Marketplace.SHOPEE,
    commissionPercentage: 14.0,
    paymentFeePercentage: 2.5,
    averageShippingCost: 12.0,
    fulfillmentFeePercentage: 0,
    isManuallySet: false,
  },
  {
    marketplace: Marketplace.SHEIN,
    commissionPercentage: 12.5,
    paymentFeePercentage: 0, // Já incluído na comissão
    averageShippingCost: 18.0,
    fulfillmentFeePercentage: 0,
    isManuallySet: false,
  },
  {
    marketplace: Marketplace.TIKTOK_SHOP,
    commissionPercentage: 5.0, // Ainda promocional
    paymentFeePercentage: 2.5,
    averageShippingCost: 15.0,
    fulfillmentFeePercentage: 0,
    isManuallySet: false,
  },
];

/**
 * Calcula o preço de venda recomendado para um marketplace
 * @param costPrice - Preço de custo do produto
 * @param desiredProfit - Lucro líquido desejado
 * @param additionalCosts - Custos adicionais (embalagem, operacional)
 * @param fees - Taxas do marketplace
 * @returns Preço de venda recomendado e lucro real
 */
export function calculateRecommendedPrice(
  costPrice: number,
  desiredProfit: number,
  additionalCosts: number,
  fees: MarketplaceFees
): { recommendedPrice: number; netProfit: number; totalCosts: number } {
  // Custos totais do produto
  const productCost = costPrice + additionalCosts;
  
  // Soma de todas as taxas percentuais
  const totalFeePercentage = 
    (fees.commissionPercentage || 0) + 
    (fees.paymentFeePercentage || 0) + 
    (fees.fulfillmentFeePercentage || 0);
  
  // Taxa fixa por item (se houver)
  const fixedFees = (fees.fixedFeePerItem || 0) + (fees.fulfillmentFeeFixed || 0);
  
  // Custo de envio médio
  const shippingCost = fees.averageShippingCost || 0;
  
  // Fórmula: Preço = (Custos + Lucro Desejado + Taxas Fixas) / (1 - Taxas%)
  // Isso garante que após todas as deduções, reste o lucro desejado
  const recommendedPrice = 
    (productCost + desiredProfit + fixedFees + shippingCost) / 
    (1 - totalFeePercentage / 100);
  
  // Calcula o lucro real com o preço recomendado
  const totalFees = (recommendedPrice * totalFeePercentage / 100) + fixedFees;
  const totalCosts = productCost + totalFees + shippingCost;
  const netProfit = recommendedPrice - totalCosts;
  
  return {
    recommendedPrice: Math.ceil(recommendedPrice * 100) / 100, // Arredonda para cima (centavos)
    netProfit: Math.round(netProfit * 100) / 100,
    totalCosts: Math.round(totalCosts * 100) / 100,
  };
}

/**
 * Calcula o lucro real de um produto com preço definido
 * @param sellingPrice - Preço de venda
 * @param costPrice - Preço de custo
 * @param additionalCosts - Custos adicionais
 * @param fees - Taxas do marketplace
 * @returns Lucro líquido
 */
export function calculateActualProfit(
  sellingPrice: number,
  costPrice: number,
  additionalCosts: number,
  fees: MarketplaceFees
): { netProfit: number; profitMargin: number; totalCosts: number } {
  const productCost = costPrice + additionalCosts;
  
  const totalFeePercentage = 
    (fees.commissionPercentage || 0) + 
    (fees.paymentFeePercentage || 0) + 
    (fees.fulfillmentFeePercentage || 0);
  
  const fixedFees = (fees.fixedFeePerItem || 0) + (fees.fulfillmentFeeFixed || 0);
  const shippingCost = fees.averageShippingCost || 0;
  
  const totalFees = (sellingPrice * totalFeePercentage / 100) + fixedFees;
  const totalCosts = productCost + totalFees + shippingCost;
  const netProfit = sellingPrice - totalCosts;
  const profitMargin = (netProfit / sellingPrice) * 100;
  
  return {
    netProfit: Math.round(netProfit * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
    totalCosts: Math.round(totalCosts * 100) / 100,
  };
}

/**
 * Formata valor monetário em Real (BRL)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata percentual
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
