'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  PieChart,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Dados mockados para investimentos
const mockInvestments = [
  {
    id: 1,
    name: 'Tesouro Direto SELIC',
    type: 'Renda Fixa',
    amount: 5000,
    currentValue: 5200,
    returnRate: 4.0,
    maturityDate: '2025-12-31',
    risk: 'Baixo',
    category: 'Governo',
    description: 'Título do Tesouro Nacional com liquidez diária',
    monthlyReturn: 0.33,
    projectedValue: 5400
  },
  {
    id: 2,
    name: 'CDB Banco Inter',
    type: 'Renda Fixa',
    amount: 3000,
    currentValue: 3150,
    returnRate: 5.2,
    maturityDate: '2025-06-30',
    risk: 'Baixo',
    category: 'Banco',
    description: 'Certificado de Depósito Bancário com rendimento de 100% do CDI',
    monthlyReturn: 0.43,
    projectedValue: 3300
  },
  {
    id: 3,
    name: 'Ações Petrobras',
    type: 'Renda Variável',
    amount: 2000,
    currentValue: 1800,
    returnRate: -10.0,
    maturityDate: null,
    risk: 'Alto',
    category: 'Ações',
    description: 'Ações preferenciais da Petrobras',
    monthlyReturn: -0.83,
    projectedValue: 2200
  },
  {
    id: 4,
    name: 'FII HGLG11',
    type: 'Fundos Imobiliários',
    amount: 1500,
    currentValue: 1650,
    returnRate: 10.0,
    maturityDate: null,
    risk: 'Médio',
    category: 'FII',
    description: 'Fundo Imobiliário Logos',
    monthlyReturn: 0.83,
    projectedValue: 1800
  },
  {
    id: 5,
    name: 'Criptomoeda Bitcoin',
    type: 'Criptomoedas',
    amount: 1000,
    currentValue: 1200,
    returnRate: 20.0,
    maturityDate: null,
    risk: 'Muito Alto',
    category: 'Crypto',
    description: 'Investimento em Bitcoin',
    monthlyReturn: 1.67,
    projectedValue: 1500
  }
];

function InvestmentsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalCurrentValue - totalInvested;
  const totalReturnRate = (totalReturn / totalInvested) * 100;
  const projectedTotalValue = mockInvestments.reduce((sum, inv) => sum + inv.projectedValue, 0);

  const filteredInvestments = selectedCategory === 'all' 
    ? mockInvestments 
    : mockInvestments.filter(inv => inv.category === selectedCategory);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Alto': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'Muito Alto': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getReturnColor = (returnRate: number) => {
    return returnRate >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Investimentos" 
        subtitle="Gerencie seus investimentos e acompanhe o rendimento" 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Carteira de Investimentos</h2>
              <p className="text-sm text-muted-foreground">
                Acompanhe o desempenho dos seus investimentos
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Investimento
            </Button>
          </div>

          {/* Portfolio Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor total aplicado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Atual</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalCurrentValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor atual da carteira
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retorno Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getReturnColor(totalReturn)}`}>
                  {formatCurrency(totalReturn)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage(totalReturnRate)} de retorno
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projeção 12m</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(projectedTotalValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor projetado para 12 meses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filtrar por categoria:</span>
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Todas
            </Button>
            <Button
              variant={selectedCategory === 'Renda Fixa' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Renda Fixa')}
            >
              Renda Fixa
            </Button>
            <Button
              variant={selectedCategory === 'Renda Variável' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Renda Variável')}
            >
              Renda Variável
            </Button>
            <Button
              variant={selectedCategory === 'Fundos Imobiliários' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Fundos Imobiliários')}
            >
              FIIs
            </Button>
            <Button
              variant={selectedCategory === 'Criptomoedas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Criptomoedas')}
            >
              Crypto
            </Button>
          </div>

          {/* Investments List */}
          <div className="space-y-4">
            {filteredInvestments.map((investment) => (
              <Card key={investment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{investment.name}</h3>
                          <p className="text-sm text-muted-foreground">{investment.description}</p>
                        </div>
                        <Badge variant="outline" className={getRiskColor(investment.risk)}>
                          {investment.risk}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Valor Investido</p>
                          <p className="font-medium">{formatCurrency(investment.amount)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Valor Atual</p>
                          <p className="font-medium">{formatCurrency(investment.currentValue)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Retorno</p>
                          <p className={`font-medium ${getReturnColor(investment.returnRate)}`}>
                            {formatPercentage(investment.returnRate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Projeção 12m</p>
                          <p className="font-medium">{formatCurrency(investment.projectedValue)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Tipo: {investment.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <PieChart className="h-3 w-3" />
                          <span>Categoria: {investment.category}</span>
                        </div>
                        {investment.maturityDate && (
                          <div className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>Vencimento: {investment.maturityDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho da Carteira</CardTitle>
              <CardDescription>
                Comparativo entre valor investido, valor atual e projeções
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvestments.map((investment) => (
                  <div key={investment.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{investment.name}</span>
                      <span className="text-muted-foreground">
                        {formatPercentage(investment.returnRate)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          investment.returnRate >= 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(investment.returnRate) * 2, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function InvestmentsPage() {
  return (
    <ProtectedRoute>
      <InvestmentsPageContent />
    </ProtectedRoute>
  );
}
