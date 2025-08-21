'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';

// Dados mockados para orçamento
const mockBudget = [
  {
    id: 1,
    category: 'Moradia',
    budget: 2500,
    spent: 2200,
    color: '#3b82f6',
    icon: '🏠',
    status: 'on-track'
  },
  {
    id: 2,
    category: 'Alimentação',
    budget: 1200,
    spent: 1350,
    color: '#10b981',
    icon: '🍽️',
    status: 'over-budget'
  },
  {
    id: 3,
    category: 'Transporte',
    budget: 800,
    spent: 650,
    color: '#f59e0b',
    icon: '🚗',
    status: 'under-budget'
  },
  {
    id: 4,
    category: 'Saúde',
    budget: 500,
    spent: 480,
    color: '#ef4444',
    icon: '🏥',
    status: 'on-track'
  },
  {
    id: 5,
    category: 'Lazer',
    budget: 400,
    spent: 350,
    color: '#8b5cf6',
    icon: '🎬',
    status: 'under-budget'
  },
  {
    id: 6,
    category: 'Educação',
    budget: 300,
    spent: 280,
    color: '#06b6d4',
    icon: '📚',
    status: 'on-track'
  }
];

function BudgetPageContent() {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalBudget = mockBudget.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = mockBudget.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'over-budget': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'under-budget': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />;
      case 'over-budget': return <AlertTriangle className="h-4 w-4" />;
      case 'under-budget': return <TrendingDown className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'No Orçamento';
      case 'over-budget': return 'Acima do Orçamento';
      case 'under-budget': return 'Abaixo do Orçamento';
      default: return 'Status Desconhecido';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Orçamento" 
        subtitle="Controle seus gastos e mantenha-se dentro do orçamento" 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Controle de Orçamento</h2>
              <p className="text-sm text-muted-foreground">
                Acompanhe seus gastos por categoria
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Orçamento
            </Button>
          </div>

          {/* Budget Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                <p className="text-xs text-muted-foreground">
                  Limite mensal definido
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                <p className="text-xs text-muted-foreground">
                  {budgetUtilization.toFixed(1)}% do orçamento
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Restante</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalRemaining)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalRemaining >= 0 ? 'Disponível' : 'Excedido'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {budgetUtilization >= 100 ? '⚠️' : budgetUtilization >= 80 ? '⚡' : '✅'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {budgetUtilization >= 100 ? 'Orçamento Excedido' : budgetUtilization >= 80 ? 'Atenção' : 'Saudável'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso Geral do Orçamento</CardTitle>
              <CardDescription>
                Utilização do orçamento mensal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Utilização</span>
                  <span className="text-sm text-muted-foreground">
                    {budgetUtilization.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(budgetUtilization, 100)} 
                  className="h-3"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(0)}</span>
                  <span>{formatCurrency(totalBudget)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Budgets */}
          <div className="grid gap-6 md:grid-cols-2">
            {mockBudget.map((item) => {
              const percentage = (item.spent / item.budget) * 100;
              const remaining = item.budget - item.spent;
              
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{item.category}</CardTitle>
                          <CardDescription>
                            Orçamento: {formatCurrency(item.budget)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{getStatusText(item.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Gasto: {formatCurrency(item.spent)}</span>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Restante</p>
                          <p className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {remaining >= 0 ? '+' : ''}{formatCurrency(remaining)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-semibold">
                            {percentage >= 100 ? 'Excedido' : percentage >= 80 ? 'Atenção' : 'Saudável'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Ajustar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Budget Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Dicas para Economizar</CardTitle>
              <CardDescription>
                Recomendações baseadas no seu orçamento atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBudget
                  .filter(item => item.status === 'over-budget')
                  .map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-200">
                          {item.category} está {formatCurrency(item.spent - item.budget)} acima do orçamento
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Considere reduzir gastos nesta categoria ou ajustar o orçamento.
                        </p>
                      </div>
                    </div>
                  ))}
                
                {mockBudget
                  .filter(item => item.status === 'under-budget')
                  .slice(0, 2)
                  .map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">
                          {item.category} está {formatCurrency(item.budget - item.spent)} abaixo do orçamento
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Ótimo controle! Você pode realocar esse valor para outras categorias se necessário.
                        </p>
                      </div>
                    </div>
                  ))}
                
                {mockBudget.filter(item => item.status === 'over-budget').length === 0 && (
                  <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Parabéns! Você está controlando bem seu orçamento
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Continue mantendo esse controle financeiro saudável.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function BudgetPage() {
  return (
    <ProtectedRoute>
      <BudgetPageContent />
    </ProtectedRoute>
  );
}
