'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Marketplace, marketplaceLabels } from '@/types';
import { formatCurrency } from '@/lib/pricing';
import { ShoppingCart, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  // TODO: Buscar dados reais do Firestore
  const stats = {
    todaySales: 1250.00,
    todayOrders: 8,
    todayProfit: 420.50,
    lowStockProducts: 3,
  };

  const marketplaceStats = [
    { marketplace: Marketplace.MERCADO_LIVRE, orders: 3, revenue: 450.00, profit: 150.20 },
    { marketplace: Marketplace.AMAZON, orders: 2, revenue: 380.00, profit: 120.50 },
    { marketplace: Marketplace.SHOPEE, orders: 2, revenue: 280.00, profit: 90.80 },
    { marketplace: Marketplace.TIKTOK_SHOP, orders: 1, revenue: 140.00, profit: 59.00 },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Visão geral do dia</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas do Dia</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.todaySales)}</div>
              <p className="text-xs text-slate-600 mt-1">Faturamento bruto</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayOrders}</div>
              <p className="text-xs text-slate-600 mt-1">Pedidos recebidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.todayProfit)}</div>
              <p className="text-xs text-slate-600 mt-1">Após taxas e custos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStockProducts}</div>
              <p className="text-xs text-slate-600 mt-1">Produtos com alerta</p>
            </CardContent>
          </Card>
        </div>

        {/* Marketplace Stats */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Vendas por Marketplace</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {marketplaceStats.map((stat) => (
              <Card key={stat.marketplace}>
                <CardHeader>
                  <CardTitle className="text-base">{marketplaceLabels[stat.marketplace]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Pedidos</span>
                    <span className="font-semibold">{stat.orders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Faturamento</span>
                    <span className="font-semibold">{formatCurrency(stat.revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Lucro</span>
                    <span className="font-semibold text-green-600">{formatCurrency(stat.profit)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
