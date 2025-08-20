# 🚀 Executar SQL Diretamente no Supabase

## 📋 Passo a Passo para Configurar o Banco

### 1. Acessar o Dashboard do Supabase

1. Vá para [supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login na sua conta
3. Selecione o projeto `hyracsbdyykuhhpwnweyyj`

### 2. Abrir o SQL Editor

1. No menu lateral esquerdo, clique em **SQL Editor**
2. Clique em **New Query** para criar uma nova consulta

### 3. Executar o Script Completo

Copie e cole o seguinte script SQL completo na janela do SQL Editor:

```sql
-- ========================================
-- CONFIGURAÇÃO COMPLETA DO BANCO FINANCE.AI
-- ========================================

-- 1. CRIAR TABELA DE TRANSAÇÕES
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

-- 2. CRIAR TABELA DE CATEGORIAS
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- 3. CRIAR TABELA DE MÉTODOS DE PAGAMENTO
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- 5. CRIAR POLÍTICAS DE SEGURANÇA PARA TRANSAÇÕES
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- 6. CRIAR POLÍTICAS DE SEGURANÇA PARA CATEGORIAS
DROP POLICY IF EXISTS "Users can view own categories" ON categories;
DROP POLICY IF EXISTS "Users can insert own categories" ON categories;
DROP POLICY IF EXISTS "Users can update own categories" ON categories;
DROP POLICY IF EXISTS "Users can delete own categories" ON categories;

CREATE POLICY "Users can view own categories" ON categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories" ON categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE USING (auth.uid() = user_id);

-- 7. CRIAR POLÍTICAS DE SEGURANÇA PARA MÉTODOS DE PAGAMENTO
DROP POLICY IF EXISTS "Users can view own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can insert own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can update own payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Users can delete own payment methods" ON payment_methods;

CREATE POLICY "Users can view own payment methods" ON payment_methods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment methods" ON payment_methods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payment methods" ON payment_methods
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payment methods" ON payment_methods
  FOR DELETE USING (auth.uid() = user_id);

-- 8. INSERIR CATEGORIAS PADRÃO
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

-- 9. INSERIR MÉTODOS DE PAGAMENTO PADRÃO
INSERT INTO payment_methods (name, user_id) VALUES
  ('Pix', NULL),
  ('Cartão de Crédito', NULL),
  ('Cartão de Débito', NULL),
  ('Dinheiro', NULL),
  ('Transferência Bancária', NULL),
  ('Boleto', NULL)
ON CONFLICT DO NOTHING;

-- 10. VERIFICAR SE AS TABELAS FORAM CRIADAS
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('transactions', 'categories', 'payment_methods');

-- 11. VERIFICAR SE O RLS ESTÁ ATIVO
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename IN ('transactions', 'categories', 'payment_methods');

-- 12. VERIFICAR CATEGORIAS INSERIDAS
SELECT * FROM categories ORDER BY type, name;

-- 13. VERIFICAR MÉTODOS DE PAGAMENTO INSERIDOS
SELECT * FROM payment_methods ORDER BY name;
```

### 4. Executar o Script

1. Clique no botão **Run** (▶️) ou pressione `Ctrl+Enter`
2. Aguarde a execução completa
3. Verifique se não há erros na aba **Results**

### 5. Verificar a Configuração

Após executar o script, você deve ver:

#### ✅ **Tabelas Criadas:**
- `transactions` - Para armazenar transações financeiras
- `categories` - Para categorias de receitas e despesas
- `payment_methods` - Para métodos de pagamento

#### ✅ **Segurança Ativada:**
- Row Level Security (RLS) habilitado em todas as tabelas
- Políticas de acesso configuradas para cada operação

#### ✅ **Dados Padrão:**
- 9 categorias (5 receitas + 4 despesas)
- 6 métodos de pagamento brasileiros

### 6. Verificar no Table Editor

1. Vá para **Table Editor** no menu lateral
2. Verifique se as 3 tabelas aparecem na lista
3. Clique em cada tabela para ver a estrutura e dados

### 7. Verificar Políticas de Segurança

1. Vá para **Authentication > Policies**
2. Verifique se as políticas foram criadas para cada tabela
3. Confirme se o RLS está ativo

## 🚨 Solução de Problemas

### Erro de Permissão
- Verifique se você tem acesso de administrador ao projeto
- Confirme se o projeto está ativo

### Erro de Sintaxe
- Copie o script exatamente como está
- Verifique se não há caracteres especiais corrompidos

### Erro de Tabela Já Existe
- O script usa `IF NOT EXISTS`, então é seguro executar múltiplas vezes
- Se houver conflito, as políticas serão recriadas

## 🎯 Próximos Passos

Após executar o script com sucesso:

1. ✅ **Banco configurado** - Todas as tabelas e políticas criadas
2. ✅ **Dados padrão** - Categorias e métodos de pagamento inseridos
3. ✅ **Segurança ativa** - RLS e políticas funcionando
4. 🚀 **Testar aplicação** - Execute `npm run dev` localmente
5. 🌐 **Fazer deploy** - Configure na Vercel

---

## 🎉 **Seu banco de dados está pronto!**

**Execute o script SQL no Supabase e sua aplicação Finance.ai funcionará perfeitamente! 💰✨**
