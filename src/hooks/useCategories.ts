import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar categorias do usuário
  const fetchCategories = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (fetchError) {
        throw fetchError;
      }

      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar categorias');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova categoria
  const addCategory = async (categoryData: Omit<Category, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('categories')
        .insert([{
          ...categoryData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Atualizar lista local
      setCategories(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar categoria';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Atualizar categoria
  const updateCategory = async (id: string, updates: Partial<Category>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Atualizar lista local
      setCategories(prev => 
        prev.map(c => c.id === id ? data : c)
      );
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Deletar categoria
  const deleteCategory = async (id: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Remover da lista local
      setCategories(prev => prev.filter(c => c.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar categoria';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  // Buscar categorias quando o usuário mudar
  useEffect(() => {
    if (user) {
      fetchCategories();
    } else {
      setCategories([]);
      setLoading(false);
    }
  }, [user]);

  // Obter categorias por tipo
  const getCategoriesByType = (type: 'income' | 'expense') => {
    return categories.filter(c => c.type === type);
  };

  // Obter categoria por nome
  const getCategoryByName = (name: string) => {
    return categories.find(c => c.name === name);
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
    getCategoriesByType,
    getCategoryByName,
  };
}
