'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  DollarSign, 
  Bitcoin, 
  Building2, 
  Home, 
  TrendingUp,
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  icon?: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const getTransactionIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'salário':
      return <DollarSign className="w-5 h-5 text-green-500" />;
    case 'bitcoin':
      return <Bitcoin className="w-5 h-5 text-yellow-500" />;
    case 'academia':
      return <Building2 className="w-5 h-5 text-blue-500" />;
    case 'aluguel':
      return <Home className="w-5 h-5 text-red-500" />;
    case 'freelancing':
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    default:
      return <DollarSign className="w-5 h-5 text-muted-foreground" />;
  }
};

export default function TransactionsList({ transactions }: TransactionsListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd MMM', { locale: ptBR });
  };

  return (
    <Card className="glass-card card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
            Transações Recentes
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-accent/50 rounded-full">
            Ver mais
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center space-x-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/60 transition-all duration-300 hover:scale-[1.02] group border border-transparent hover:border-border/50"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'slideInUp 0.5s ease-out forwards'
            }}
          >
            <div className="flex-shrink-0">
              <div className="p-2 rounded-lg bg-background/50 group-hover:bg-background/80 transition-colors duration-300">
                {getTransactionIcon(transaction.category)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-gradient transition-colors duration-300">
                {transaction.title}
              </p>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {formatDate(transaction.date)}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <span
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-500/20 text-red-600 dark:text-red-400'
                } group-hover:scale-110 transition-transform duration-300`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(Math.abs(transaction.amount))}
              </span>
            </div>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-full p-2 h-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
