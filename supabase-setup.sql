-- Script de configuração do Supabase para o projeto Finance.ai
-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Criar tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  date DATE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- 3. Criar tabela de métodos de pagamento
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas de segurança para transações
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Criar políticas de segurança para categorias
CREATE POLICY "Users can view own categories" ON categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories" ON categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE USING (auth.uid() = user_id);

-- 7. Criar políticas de segurança para métodos de pagamento
CREATE POLICY "Users can view own payment methods" ON payment_methods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment methods" ON payment_methods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payment methods" ON payment_methods
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payment methods" ON payment_methods
  FOR DELETE USING (auth.uid() = user_id);

-- 8. Inserir categorias padrão (opcional)
INSERT INTO categories (name, type, color, icon, user_id) VALUES
  ('Salário', 'income', '#22c55e', 'dollar-sign', NULL),
  ('Freelancing', 'income', '#22c55e', 'trending-up', NULL),
  ('Investimentos', 'income', '#22c55e', 'trending-up', NULL),
  ('Moradia', 'expense', '#ef4444', 'home', NULL),
  ('Alimentação', 'expense', '#ef4444', 'utensils', NULL),
  ('Transporte', 'expense', '#ef4444', 'car', NULL),
  ('Saúde', 'expense', '#ef4444', 'heart', NULL),
  ('Educação', 'expense', '#ef4444', 'book-open', NULL),
  ('Lazer', 'expense', '#ef4444', 'smile', NULL)
ON CONFLICT DO NOTHING;

-- 9. Inserir métodos de pagamento padrão (opcional)
INSERT INTO payment_methods (name, user_id) VALUES
  ('Pix', NULL),
  ('Cartão de Crédito', NULL),
  ('Cartão de Débito', NULL),
  ('Dinheiro', NULL),
  ('Transferência Bancária', NULL),
  ('Boleto', NULL)
ON CONFLICT DO NOTHING;

-- 10. Verificar se as tabelas foram criadas
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('transactions', 'categories', 'payment_methods');

-- 11. Verificar se o RLS está ativo
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename IN ('transactions', 'categories', 'payment_methods');
