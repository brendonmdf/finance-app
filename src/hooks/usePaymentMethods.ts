import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface PaymentMethod {
  id: string;
  user_id: string;
  name: string;
  type: 'cash' | 'card' | 'bank' | 'digital';
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function usePaymentMethods() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar métodos de pagamento do usuário
  const fetchPaymentMethods = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (fetchError) {
        throw fetchError;
      }

      setPaymentMethods(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar métodos de pagamento');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo método de pagamento
  const addPaymentMethod = async (paymentMethodData: Omit<PaymentMethod, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('payment_methods')
        .insert([{
          ...paymentMethodData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Atualizar lista local
      setPaymentMethods(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar método de pagamento';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Atualizar método de pagamento
  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Atualizar lista local
      setPaymentMethods(prev => 
        prev.map(pm => pm.id === id ? data : pm)
      );
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar método de pagamento';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Deletar método de pagamento
  const deletePaymentMethod = async (id: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Remover da lista local
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar método de pagamento';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Buscar métodos de pagamento quando o usuário mudar
  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    } else {
      setPaymentMethods([]);
      setLoading(false);
    }
  }, [user]);

  // Obter método de pagamento por nome
  const getPaymentMethodByName = (name: string) => {
    return paymentMethods.find(pm => pm.name === name);
  };

  // Obter método de pagamento padrão
  const getDefaultPaymentMethod = () => {
    return paymentMethods.find(pm => pm.is_default);
  };

  return {
    paymentMethods,
    loading,
    error,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    fetchPaymentMethods,
    getPaymentMethodByName,
    getDefaultPaymentMethod,
  };
}
