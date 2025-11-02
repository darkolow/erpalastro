'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProdutosPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Produtos</h1>
            <p className="text-slate-600 mt-1">Gerencie seu catálogo de produtos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Módulo de Produtos em desenvolvimento...</p>
          <p className="text-sm text-slate-500 mt-2">
            Aqui você poderá cadastrar produtos, gerenciar variações, estoque e calcular preços por marketplace.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
