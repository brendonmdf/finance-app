'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: TransactionData) => void;
}

interface TransactionData {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  paymentMethod: string;
  date: string;
}

export default function AddTransactionModal({ isOpen, onClose, onSubmit }: AddTransactionModalProps) {
  const [formData, setFormData] = useState<TransactionData>({
    title: '',
    amount: 0,
    type: 'income',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0] || ''
  });

  const transactionTypes = [
    { value: 'income', label: 'Receita' },
    { value: 'expense', label: 'Despesa' }
  ];

  const paymentMethods = [
    'Pix', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Transferência'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      title: '',
      amount: 0,
      type: 'income',
      paymentMethod: '',
      date: new Date().toISOString().split('T')[0] || ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Transação</DialogTitle>
          <p className="text-sm text-muted-foreground">Insira as informações abaixo</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">Título</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Título"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-muted-foreground">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-muted-foreground">Tipo da transação</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as 'income' | 'expense' })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {transactionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-foreground hover:bg-accent">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-muted-foreground">Método de pagamento</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method} className="text-foreground hover:bg-accent">
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-muted-foreground">Data</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-background border-border text-foreground pl-10"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
