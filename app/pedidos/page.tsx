'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PedidosPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Pedidos</h1>
            <p className="text-slate-600 mt-1">Acompanhe e gerencie seus pedidos</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Módulo de Pedidos em desenvolvimento...</p>
          <p className="text-sm text-slate-500 mt-2">
            Aqui você poderá gerenciar pedidos, atualizar status, controlar separação e envio.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
