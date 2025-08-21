'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import BalanceCard from '@/components/BalanceCard';
import MetricCard from '@/components/MetricCard';
import DonutChart from '@/components/DonutChart';
import ExpensesByCategory from '@/components/ExpensesByCategory';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionModal from '@/components/AddTransactionModal';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TrendingUp, TrendingDown, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    transactions, 
    loading, 
    totalIncome, 
    totalExpenses, 
    balance,
    addTransaction 
  } = useTransactions();

  const handleAddTransaction = async (transactionData: any) => {
    const result = await addTransaction({
      title: transactionData.title,
      amount: transactionData.amount,
      type: transactionData.type,
      category: transactionData.category,
      payment_method: transactionData.paymentMethod || 'Dinheiro',
      date: transactionData.date,
      description: transactionData.description
    });

    if (!result.error) {
      setIsModalOpen(false);
    }
  };

  // Calcular dados para os gráficos baseados nas transações reais
  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(cat => cat.name === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        acc.push({ name: t.category, amount: t.amount, percentage: 0 });
      }
      return acc;
    }, [] as { name: string; amount: number; percentage: number }[])
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map(cat => ({
      ...cat,
      percentage: totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0
    }));

  const chartData = [
    { name: 'Receitas', value: totalIncome, color: '#22c55e', percentage: totalIncome > 0 ? 60 : 0 },
    { name: 'Despesas', value: totalExpenses, color: '#ef4444', percentage: totalExpenses > 0 ? 40 : 0 }
  ];

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <Header 
          title="Dashboard" 
          subtitle="Bem-vindo de volta! Aqui está um resumo das suas finanças." 
        />
        <div className="flex-1 overflow-auto p-4 lg:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando suas finanças...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Dashboard" 
        subtitle="Bem-vindo de volta! Aqui está um resumo das suas finanças." 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Visão Geral</h2>
              <p className="text-sm text-muted-foreground">
                Resumo das suas atividades financeiras
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
          </div>

          {/* Revenue Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Saldo Total"
              value={balance}
              icon={Star}
              color="text-blue-500"
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
            <MetricCard
              title="Transações"
              value={transactions.length}
              icon={Star}
              color="text-yellow-500"
            />
          </div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Balance Card */}
              <BalanceCard 
                balance={balance} 
                onAddTransaction={() => setIsModalOpen(true)} 
              />
              
              {/* Donut Chart */}
              <DonutChart data={chartData} />
              
              {/* Expenses by Category */}
              <ExpensesByCategory data={expenseCategories} />
            </div>
            
            {/* Right Column - Transactions */}
            <div className="space-y-6">
              <TransactionsList transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal */}
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
