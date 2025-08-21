'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

// Dados mockados para os gráficos
const mockData = {
  revenue: [
    { month: 'Jan', value: 12000 },
    { month: 'Fev', value: 15000 },
    { month: 'Mar', value: 18000 },
    { month: 'Abr', value: 14000 },
    { month: 'Mai', value: 22000 },
    { month: 'Jun', value: 25000 },
  ],
  expenses: [
    { month: 'Jan', value: 8000 },
    { month: 'Fev', value: 9000 },
    { month: 'Mar', value: 11000 },
    { month: 'Abr', value: 8500 },
    { month: 'Mai', value: 12000 },
    { month: 'Jun', value: 14000 },
  ],
  categories: [
    { name: 'Moradia', value: 35, color: '#3b82f6' },
    { name: 'Alimentação', value: 25, color: '#10b981' },
    { name: 'Transporte', value: 20, color: '#f59e0b' },
    { name: 'Saúde', value: 15, color: '#ef4444' },
    { name: 'Lazer', value: 5, color: '#8b5cf6' },
  ],
  recentTransactions: [
    { id: 1, type: 'income', amount: 2500, description: 'Salário', date: '2024-06-15' },
    { id: 2, type: 'expense', amount: 120, description: 'Academia', date: '2024-06-14' },
    { id: 3, type: 'expense', amount: 80, description: 'Combustível', date: '2024-06-13' },
    { id: 4, type: 'income', amount: 800, description: 'Freelance', date: '2024-06-12' },
    { id: 5, type: 'expense', amount: 200, description: 'Supermercado', date: '2024-06-11' },
  ]
};

function AnalyticsPageContent() {
  const [timeRange, setTimeRange] = useState('6m');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalRevenue = mockData.revenue.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = mockData.expenses.reduce((sum, item) => sum + item.value, 0);
  const netIncome = totalRevenue - totalExpenses;
  const growthRate = ((netIncome - 15000) / 15000) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Analytics" 
        subtitle="Análise detalhada das suas finanças e tendências" 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Visão Geral</h2>
              <p className="text-sm text-muted-foreground">
                Análise dos últimos 6 meses
              </p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 mês</SelectItem>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="1y">1 ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                <p className="text-xs text-muted-foreground">
                  +12.3% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(netIncome)}</div>
                <p className="text-xs text-muted-foreground">
                  {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{growthRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Crescimento mensal médio
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="trends">Tendências</TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Receitas vs Despesas</CardTitle>
                    <CardDescription>
                      Comparativo mensal dos últimos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="space-y-4">
                      {mockData.revenue.map((item, index) => (
                        <div key={item.month} className="flex items-center space-x-4">
                          <div className="w-12 text-sm text-muted-foreground">{item.month}</div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-2 bg-green-500 rounded" style={{ width: `${(item.value / 25000) * 100}%` }} />
                              <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-2 bg-red-500 rounded" style={{ width: `${(mockData.expenses[index].value / 14000) * 100}%` }} />
                              <span className="text-sm font-medium">{formatCurrency(mockData.expenses[index].value)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                    <CardDescription>
                      Distribuição dos gastos por categoria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.categories.map((category) => (
                        <div key={category.name} className="flex items-center space-x-4">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">{category.value}%</p>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${category.value}%`, 
                                backgroundColor: category.color 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tendências de Crescimento</CardTitle>
                  <CardDescription>
                    Análise das tendências de receita e despesas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="font-medium">Receitas em Crescimento</p>
                          <p className="text-sm text-muted-foreground">
                            Tendência positiva nos últimos 3 meses
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">+15.2%</p>
                        <p className="text-sm text-muted-foreground">vs mês anterior</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <TrendingDown className="h-8 w-8 text-red-500" />
                        <div>
                          <p className="font-medium">Controle de Despesas</p>
                          <p className="text-sm text-muted-foreground">
                            Despesas controladas e estáveis
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">+8.7%</p>
                        <p className="text-sm text-muted-foreground">vs mês anterior</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Gastos</CardTitle>
                    <CardDescription>
                      Visualização em pizza das categorias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-64">
                      <div className="relative w-48 h-48">
                        {mockData.categories.map((category, index) => {
                          const total = mockData.categories.reduce((sum, cat) => sum + cat.value, 0);
                          const percentage = (category.value / total) * 100;
                          const rotation = mockData.categories
                            .slice(0, index)
                            .reduce((sum, cat) => sum + (cat.value / total) * 360, 0);
                          
                          return (
                            <div
                              key={category.name}
                              className="absolute inset-0 rounded-full border-4 border-transparent"
                              style={{
                                background: `conic-gradient(${category.color} 0deg ${rotation}deg, ${category.color} ${rotation}deg ${rotation + (percentage * 360 / 100)}deg, transparent ${rotation + (percentage * 360 / 100)}deg)`
                              }}
                            />
                          );
                        })}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                            <p className="text-sm text-muted-foreground">Total</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Transações Recentes</CardTitle>
                    <CardDescription>
                      Últimas movimentações financeiras
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                          <div className={`font-semibold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsPageContent />
    </ProtectedRoute>
  );
}
