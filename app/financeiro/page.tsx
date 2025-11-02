'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function FinanceiroPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-600 mt-1">Relatórios e análises financeiras</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Módulo Financeiro em desenvolvimento...</p>
          <p className="text-sm text-slate-500 mt-2">
            Aqui você poderá visualizar relatórios, gerenciar taxas dos marketplaces e análise de margem de lucro.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
