'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ConfiguracoesPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600 mt-1">Gerencie configurações do sistema</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Módulo de Configurações em desenvolvimento...</p>
          <p className="text-sm text-slate-500 mt-2">
            Aqui você poderá configurar taxas dos marketplaces, usuários, perfis de acesso e outras configurações.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
