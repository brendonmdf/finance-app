'use client';

import { useState } from 'react';
import { Eye, EyeOff, Wallet, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BalanceCardProps {
  balance: number;
  onAddTransaction: () => void;
}

export default function BalanceCard({ balance, onAddTransaction }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getBalanceStatus = (balance: number) => {
    if (balance > 0) return { icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' };
    if (balance < 0) return { icon: TrendingUp, color: 'text-red-400', bg: 'bg-red-500/10', rotation: 'rotate-180' };
    return { icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
  };

  const status = getBalanceStatus(balance);

  return (
    <Card className="glass-card card-hover relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${status.bg}`}>
              <Wallet className={`w-6 h-6 ${status.color}`} />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">Saldo</span>
              <div className="flex items-center space-x-2 mt-1">
                <status.icon className={`w-4 h-4 ${status.color} ${status.rotation || ''}`} />
                <span className="text-sm text-muted-foreground">
                  {balance > 0 ? 'Positivo' : balance < 0 ? 'Negativo' : 'Neutro'}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-full p-2"
          >
            {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div className="text-center">
          <span className="text-4xl font-bold text-foreground block">
            {isVisible ? formatCurrency(balance) : '••••••'}
          </span>
          {isVisible && (
            <p className="text-sm text-muted-foreground mt-2">
              {balance > 0 ? 'Seu saldo está positivo!' : balance < 0 ? 'Atenção ao saldo negativo' : 'Saldo equilibrado'}
            </p>
          )}
        </div>

        <Button
          onClick={onAddTransaction}
          className="w-full gradient-primary hover:shadow-glow text-primary-foreground font-semibold py-4 px-6 h-auto rounded-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Adicionar Transação</span>
        </Button>
      </CardContent>
    </Card>
  );
}
