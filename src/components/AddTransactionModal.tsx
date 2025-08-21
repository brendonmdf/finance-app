'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCategories } from '@/hooks/useCategories';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: TransactionData) => void;
}

interface TransactionData {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  paymentMethod: string;
  date: string;
  description?: string;
}

export default function AddTransactionModal({ isOpen, onClose, onSubmit }: AddTransactionModalProps) {
  const { categories, getCategoriesByType } = useCategories();
  const { paymentMethods } = usePaymentMethods();
  
  const [formData, setFormData] = useState<TransactionData>({
    title: '',
    amount: 0,
    type: 'income',
    category: '',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0] || '',
    description: ''
  });

  const transactionTypes = [
    { value: 'income', label: 'Receita' },
    { value: 'expense', label: 'Despesa' }
  ];

  // Obter categorias baseadas no tipo selecionado
  const availableCategories = getCategoriesByType(formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      title: '',
      amount: 0,
      type: 'income',
      category: '',
      paymentMethod: '',
      date: new Date().toISOString().split('T')[0] || '',
      description: ''
    });
  };

  // Resetar categoria quando o tipo mudar
  useEffect(() => {
    setFormData(prev => ({ ...prev, category: '' }));
  }, [formData.type]);

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
            <Label htmlFor="category" className="text-muted-foreground">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {availableCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name} className="text-foreground hover:bg-accent">
                    {category.name}
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
                  <SelectItem key={method.id} value={method.name} className="text-foreground hover:bg-accent">
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-muted-foreground">Descrição (opcional)</Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Descrição da transação"
            />
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
