'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import BalanceCard from '@/components/BalanceCard';
import MetricCard from '@/components/MetricCard';
import DonutChart from '@/components/DonutChart';
import ExpensesByCategory from '@/components/ExpensesByCategory';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionModal from '@/components/AddTransactionModal';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TrendingUp, TrendingDown, Star, Sparkles } from 'lucide-react';

// Dados mockados para demonstração
const mockTransactions = [
  {
    id: '1',
    title: 'Salário',
    amount: 3900,
    type: 'income' as const,
    category: 'Salário',
    date: new Date('2024-11-15')
  },
  {
    id: '2',
    title: 'Bitcoin',
    amount: 2500,
    type: 'expense' as const,
    category: 'Bitcoin',
    date: new Date('2024-11-14')
  },
  {
    id: '3',
    title: 'Academia',
    amount: 120.90,
    type: 'expense' as const,
    category: 'Academia',
    date: new Date('2024-11-13')
  },
  {
    id: '4',
    title: 'Aluguel',
    amount: 297.90,
    type: 'expense' as const,
    category: 'Aluguel',
    date: new Date('2024-11-12')
  },
  {
    id: '5',
    title: 'Freelancing',
    amount: 1750,
    type: 'income' as const,
    category: 'Freelancing',
    date: new Date('2024-11-11')
  }
];

const mockExpenseCategories = [
  { name: 'Moradia', amount: 2500, percentage: 50 },
  { name: 'Alimentação', amount: 1200, percentage: 40 },
  { name: 'Saúde', amount: 320, percentage: 30 },
  { name: 'Transporte', amount: 150, percentage: 20 }
];

const mockChartData = [
  { name: 'Ganhos', value: 8150, color: '#22c55e', percentage: 60 },
  { name: 'Gastos', value: 2950, color: '#ef4444', percentage: 22 },
  { name: 'Investimentos', value: 3500, color: '#64748b', percentage: 18 }
];

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleAddTransaction = (transactionData: any) => {
    const newTransaction = {
      id: Date.now().toString(),
      title: transactionData.title,
      amount: transactionData.amount,
      type: transactionData.type,
      category: transactionData.title,
      date: new Date(transactionData.date)
    };
    
    setTransactions([newTransaction, ...transactions]);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation activePage="dashboard" />
      
      <main className="p-6 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-muted-foreground text-lg">
              Bem-vindo de volta! Aqui está um resumo das suas finanças.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card de Saldo */}
              <BalanceCard 
                balance={balance} 
                onAddTransaction={() => setIsModalOpen(true)} 
              />
              
              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  title="Investido"
                  value={3500}
                  icon={Star}
                  color="text-yellow-500"
                />
                <MetricCard
                  title="Receita"
                  value={totalIncome}
                  icon={TrendingUp}
                  color="text-green-500"
                />
                <MetricCard
                  title="Despesas"
                  value={totalExpenses}
                  icon={TrendingDown}
                  color="text-red-500"
                />
              </div>
              
              {/* Gráfico de Rosca */}
              <DonutChart data={mockChartData} />
              
              {/* Gastos por Categoria */}
              <ExpensesByCategory categories={mockExpenseCategories} />
            </div>
            
            {/* Coluna Direita */}
            <div className="space-y-6">
              {/* Lista de Transações */}
              <TransactionsList transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal de Adicionar Transação */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
