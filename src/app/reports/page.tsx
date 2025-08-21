'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';

// Dados mockados para relatórios
const mockData = {
  monthlyExpenses: [
    { category: 'Moradia', amount: 2500, percentage: 35, color: '#3b82f6' },
    { category: 'Alimentação', amount: 1800, percentage: 25, color: '#10b981' },
    { category: 'Transporte', amount: 1200, percentage: 17, color: '#f59e0b' },
    { category: 'Saúde', amount: 800, percentage: 11, color: '#ef4444' },
    { category: 'Lazer', amount: 600, percentage: 8, color: '#8b5cf6' },
    { category: 'Educação', amount: 400, percentage: 6, color: '#06b6d4' }
  ],
  monthlyIncome: [
    { source: 'Salário', amount: 4500, percentage: 70, color: '#10b981' },
    { source: 'Freelance', amount: 1200, percentage: 19, color: '#3b82f6' },
    { source: 'Investimentos', amount: 500, percentage: 8, color: '#f59e0b' },
    { source: 'Outros', amount: 200, percentage: 3, color: '#8b5cf6' }
  ],
  transactions: [
    { id: 1, type: 'expense', category: 'Moradia', description: 'Aluguel', amount: 1200, date: '2024-06-01' },
    { id: 2, type: 'expense', category: 'Moradia', description: 'Contas de luz', amount: 150, date: '2024-06-05' },
    { id: 3, type: 'expense', category: 'Moradia', description: 'Internet', amount: 100, date: '2024-06-10' },
    { id: 4, type: 'expense', category: 'Alimentação', description: 'Supermercado', amount: 800, date: '2024-06-03' },
    { id: 5, type: 'expense', category: 'Alimentação', description: 'Restaurante', amount: 200, date: '2024-06-08' },
    { id: 6, type: 'expense', category: 'Transporte', description: 'Combustível', amount: 300, date: '2024-06-02' },
    { id: 7, type: 'expense', category: 'Transporte', description: 'Uber', amount: 150, date: '2024-06-12' },
    { id: 8, type: 'expense', category: 'Saúde', description: 'Academia', amount: 120, date: '2024-06-01' },
    { id: 9, type: 'expense', category: 'Saúde', description: 'Farmácia', amount: 80, date: '2024-06-15' },
    { id: 10, type: 'expense', category: 'Lazer', description: 'Cinema', amount: 60, date: '2024-06-20' },
    { id: 11, type: 'income', source: 'Salário', description: 'Salário mensal', amount: 4500, date: '2024-06-05' },
    { id: 12, type: 'income', source: 'Freelance', description: 'Projeto web', amount: 800, date: '2024-06-18' },
    { id: 13, type: 'income', source: 'Investimentos', description: 'Dividendos FII', amount: 150, date: '2024-06-25' }
  ]
};

function ReportsPageContent() {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');
  const [selectedReportType, setSelectedReportType] = useState('expenses');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showAllItems, setShowAllItems] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const totalExpenses = mockData.monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = mockData.monthlyIncome.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const filteredTransactions = mockData.transactions.filter(transaction => {
    if (selectedReportType === 'expenses') {
      return transaction.type === 'expense';
    } else if (selectedReportType === 'income') {
      return transaction.type === 'income';
    }
    return true;
  });

  const displayedTransactions = showAllItems ? filteredTransactions : filteredTransactions.slice(0, 10);

  const handleSelectAll = () => {
    if (selectedItems.length === displayedTransactions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(displayedTransactions.map(t => t.id));
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDownloadReport = () => {
    if (selectedItems.length === 0) {
      alert('Selecione pelo menos um item para incluir no relatório.');
      return;
    }

    const selectedTransactions = mockData.transactions.filter(t => selectedItems.includes(t.id));
    
    // Simular geração do relatório
    const reportData = {
      month: selectedMonth,
      reportType: selectedReportType,
      totalItems: selectedItems.length,
      transactions: selectedTransactions,
      summary: {
        totalAmount: selectedTransactions.reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: selectedTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        totalIncome: selectedTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
      }
    };

    // Simular download do arquivo
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${selectedMonth}-${selectedReportType}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Relatório baixado com sucesso! ${selectedItems.length} itens incluídos.`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Header 
        title="Relatórios" 
        subtitle="Análise detalhada e relatórios personalizados das suas finanças" 
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="space-y-6">
          {/* Report Controls */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Relatório Mensal</h2>
              <p className="text-sm text-muted-foreground">
                Selecione o período e tipo de relatório
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-06">Junho 2024</SelectItem>
                  <SelectItem value="2024-05">Maio 2024</SelectItem>
                  <SelectItem value="2024-04">Abril 2024</SelectItem>
                  <SelectItem value="2024-03">Março 2024</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenses">Despesas</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="all">Completo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
                <p className="text-xs text-muted-foreground">
                  Mês de {formatDate(selectedMonth + '-01')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
                <p className="text-xs text-muted-foreground">
                  Mês de {formatDate(selectedMonth + '-01')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netIncome)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {netIncome >= 0 ? 'Superávit' : 'Déficit'} mensal
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Expenses Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Despesas</CardTitle>
                <CardDescription>
                  Gastos por categoria em {formatDate(selectedMonth + '-01')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.monthlyExpenses.map((category) => (
                    <div key={category.category} className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{category.category}</p>
                        <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${category.percentage}%`, 
                            backgroundColor: category.color 
                          }}
                        />
                      </div>
                      <div className="text-sm font-medium w-20 text-right">
                        {formatCurrency(category.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Income Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receitas</CardTitle>
                <CardDescription>
                  Fontes de renda em {formatDate(selectedMonth + '-01')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.monthlyIncome.map((source) => (
                    <div key={source.source} className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{source.source}</p>
                        <p className="text-xs text-muted-foreground">{source.percentage}%</p>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${source.percentage}%`, 
                            backgroundColor: source.color 
                          }}
                        />
                      </div>
                      <div className="text-sm font-medium w-20 text-right">
                        {formatCurrency(source.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List with Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transações do Mês</CardTitle>
                  <CardDescription>
                    Selecione os itens que deseja incluir no relatório
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllItems(!showAllItems)}
                  >
                    {showAllItems ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showAllItems ? 'Mostrar Menos' : 'Mostrar Todas'}
                  </Button>
                  <Button
                    onClick={handleSelectAll}
                    variant="outline"
                    size="sm"
                  >
                    {selectedItems.length === displayedTransactions.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                  </Button>
                  <Button
                    onClick={handleDownloadReport}
                    disabled={selectedItems.length === 0}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Baixar Relatório ({selectedItems.length})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {displayedTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <Checkbox
                      checked={selectedItems.includes(transaction.id)}
                      onCheckedChange={() => handleSelectItem(transaction.id)}
                    />
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.type === 'income' ? transaction.source : transaction.category} • {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
              
              {!showAllItems && filteredTransactions.length > 10 && (
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 10 de {filteredTransactions.length} transações
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Options */}
          <Card>
            <CardHeader>
              <CardTitle>Opções do Relatório</CardTitle>
              <CardDescription>
                Personalize o conteúdo do seu relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Incluir no Relatório:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Resumo executivo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Gráficos e visualizações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Lista detalhada de transações</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Análise de tendências</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Formato de Saída:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">PDF</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Excel</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Word</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">CSV</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <ReportsPageContent />
    </ProtectedRoute>
  );
}
