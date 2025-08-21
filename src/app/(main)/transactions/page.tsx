'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import AddTransactionModal from '@/components/AddTransactionModal';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';

function TransactionsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  
  const { 
    transactions, 
    loading, 
    totalIncome, 
    totalExpenses, 
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

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };



  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <Header 
          title="Transações" 
          subtitle="Gerencie todas as suas movimentações financeiras" 
        />
        <div className="flex-1 overflow-auto p-4 lg:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando transações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Transações" 
        subtitle="Gerencie todas as suas movimentações financeiras" 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Histórico</h2>
              <p className="text-sm text-muted-foreground">
                Acompanhe todas as suas transações
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
          </div>

          {/* Filtros e Busca */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Buscar transações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterType} onValueChange={(value) => setFilterType(value as 'all' | 'income' | 'expense')}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="income">Receitas</SelectItem>
                      <SelectItem value="expense">Despesas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-sm font-medium text-muted-foreground">Total de Receitas</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-sm font-medium text-muted-foreground">Total de Despesas</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-sm font-medium text-muted-foreground">Saldo</p>
                <p className="text-2xl font-bold">{formatCurrency(totalIncome - totalExpenses)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Transações */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categoria</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Método</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            }`}>
                              {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">{transaction.category}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(new Date(transaction.date))}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.payment_method}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`text-sm font-semibold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(Math.abs(transaction.amount))}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          {searchTerm || filterType !== 'all' ? (
                            <div>
                              <p>Nenhuma transação encontrada com os filtros aplicados.</p>
                              <p className="text-sm">Tente ajustar os filtros ou adicionar uma nova transação.</p>
                            </div>
                          ) : (
                            <div>
                              <p>Nenhuma transação encontrada.</p>
                              <p className="text-sm">Adicione sua primeira transação para começar!</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <TransactionsPageContent />
    </ProtectedRoute>
  );
}
