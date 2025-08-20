'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AddTransactionModal from '@/components/AddTransactionModal';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  paymentMethod: string;
}

const mockTransactions = [
  {
    id: '1',
    title: 'Salário',
    amount: 3900,
    type: 'income' as const,
    category: 'Salário',
    date: new Date('2024-11-15'),
    paymentMethod: 'Transferência'
  },
  {
    id: '2',
    title: 'Bitcoin',
    amount: 2500,
    type: 'expense' as const,
    category: 'Investimento',
    date: new Date('2024-11-14'),
    paymentMethod: 'Pix'
  },
  {
    id: '3',
    title: 'Academia',
    amount: 120.90,
    type: 'expense' as const,
    category: 'Saúde',
    date: new Date('2024-11-13'),
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: '4',
    title: 'Aluguel',
    amount: 297.90,
    type: 'expense' as const,
    category: 'Moradia',
    date: new Date('2024-11-12'),
    paymentMethod: 'Transferência'
  },
  {
    id: '5',
    title: 'Freelancing',
    amount: 1750,
    type: 'income' as const,
    category: 'Trabalho',
    date: new Date('2024-11-11'),
    paymentMethod: 'Pix'
  }
];

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const handleAddTransaction = (transactionData: any) => {
    const newTransaction = {
      id: Date.now().toString(),
      title: transactionData.title,
      amount: transactionData.amount,
      type: transactionData.type,
      category: transactionData.title,
      date: new Date(transactionData.date),
      paymentMethod: transactionData.paymentMethod
    };
    
    setTransactions([newTransaction, ...transactions]);
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

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation activePage="transactions" />
      
      <main className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Transações</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>Nova Transação</span>
          </Button>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6 bg-dark-800 border-dark-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-dark-700 border-dark-600 text-white pl-10 placeholder:text-gray-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <Select value={filterType} onValueChange={(value) => setFilterType(value as 'all' | 'income' | 'expense')}>
                  <SelectTrigger className="w-32 bg-dark-700 border-dark-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-800 border-dark-600">
                    <SelectItem value="all" className="text-white hover:bg-dark-700">Todas</SelectItem>
                    <SelectItem value="income" className="text-white hover:bg-dark-700">Receitas</SelectItem>
                    <SelectItem value="expense" className="text-white hover:bg-dark-700">Despesas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-dark-800 border-dark-700 text-center">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Total de Receitas</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(totalIncome)}</p>
            </CardContent>
          </Card>
          <Card className="bg-dark-800 border-dark-700 text-center">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Total de Despesas</p>
              <p className="text-2xl font-bold text-error">{formatCurrency(totalExpenses)}</p>
            </CardContent>
          </Card>
          <Card className="bg-dark-800 border-dark-700 text-center">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-400 mb-1">Saldo</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalIncome - totalExpenses)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Transações */}
        <Card className="bg-dark-800 border-dark-700">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Categoria</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Método</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'income' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-error/20 text-error'
                        }`}>
                          {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-white">{transaction.category}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{transaction.paymentMethod}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-sm font-semibold ${
                          transaction.type === 'income' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
