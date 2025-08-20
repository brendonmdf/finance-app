import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
}

interface ExpensesByCategoryProps {
  categories: ExpenseCategory[];
}

export default function ExpensesByCategory({ categories }: ExpensesByCategoryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoryColor = (percentage: number) => {
    if (percentage >= 80) return 'from-red-500 to-red-600';
    if (percentage >= 60) return 'from-orange-500 to-orange-600';
    if (percentage >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <Card className="glass-card card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
          Gastos por categoria
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{category.name}</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(category.amount)}
              </span>
            </div>
            
            <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category.percentage)} transition-all duration-1000 ease-out shadow-lg`}
                style={{ 
                  width: '0%',
                  animation: `progressBar 1s ease-out forwards ${index * 0.2}s`
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{category.percentage}% do total</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category.percentage)}`}></div>
                <span className="text-xs text-muted-foreground">
                  {category.percentage >= 80 ? 'Alto' : category.percentage >= 60 ? 'Médio' : 'Baixo'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: var(--percentage); }
        }
      `}</style>
    </Card>
  );
}
