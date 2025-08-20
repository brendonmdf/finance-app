const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://hyracsbdyykuhhpwnweyyj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYWNzYmR5eWt1aGhwbndleXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ1NzIsImV4cCI6MjA3MDg0MDU3Mn0.Gz0Cf4zKjCcc23-KEXBKJmEh9-vgqPv1rCM6S66YTPQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Iniciando configuração do banco de dados...\n');

  try {
    // 1. Criar tabela de transações
    console.log('📊 Criando tabela de transações...');
    const { error: transactionsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (transactionsError) {
      console.log('⚠️  Erro ao criar tabela transactions:', transactionsError.message);
    } else {
      console.log('✅ Tabela transactions criada com sucesso!');
    }

    // 2. Criar tabela de categorias
    console.log('\n📊 Criando tabela de categorias...');
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
          color TEXT NOT NULL,
          icon TEXT NOT NULL,
          user_id UUID REFERENCES auth.users(id)
        );
      `
    });

    if (categoriesError) {
      console.log('⚠️  Erro ao criar tabela categories:', categoriesError.message);
    } else {
      console.log('✅ Tabela categories criada com sucesso!');
    }

    // 3. Criar tabela de métodos de pagamento
    console.log('\n📊 Criando tabela de métodos de pagamento...');
    const { error: paymentMethodsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS payment_methods (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          user_id UUID REFERENCES auth.users(id)
        );
      `
    });

    if (paymentMethodsError) {
      console.log('⚠️  Erro ao criar tabela payment_methods:', paymentMethodsError.message);
    } else {
      console.log('✅ Tabela payment_methods criada com sucesso!');
    }

    // 4. Habilitar Row Level Security (RLS)
    console.log('\n🔒 Habilitando Row Level Security...');
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
        ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
      `
    });

    if (rlsError) {
      console.log('⚠️  Erro ao habilitar RLS:', rlsError.message);
    } else {
      console.log('✅ RLS habilitado com sucesso!');
    }

    // 5. Criar políticas de segurança para transações
    console.log('\n🔐 Criando políticas de segurança para transações...');
    const { error: transactionsPoliciesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (transactionsPoliciesError) {
      console.log('⚠️  Erro ao criar políticas para transactions:', transactionsPoliciesError.message);
    } else {
      console.log('✅ Políticas para transactions criadas com sucesso!');
    }

    // 6. Criar políticas de segurança para categorias
    console.log('\n🔐 Criando políticas de segurança para categorias...');
    const { error: categoriesPoliciesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (categoriesPoliciesError) {
      console.log('⚠️  Erro ao criar políticas para categories:', categoriesPoliciesError.message);
    } else {
      console.log('✅ Políticas para categories criadas com sucesso!');
    }

    // 7. Criar políticas de segurança para métodos de pagamento
    console.log('\n🔐 Criando políticas de segurança para métodos de pagamento...');
    const { error: paymentMethodsPoliciesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (paymentMethodsPoliciesError) {
      console.log('⚠️  Erro ao criar políticas para payment_methods:', paymentMethodsPoliciesError.message);
    } else {
      console.log('✅ Políticas para payment_methods criadas com sucesso!');
    }

    // 8. Inserir categorias padrão
    console.log('\n📝 Inserindo categorias padrão...');
    const { error: categoriesInsertError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (categoriesInsertError) {
      console.log('⚠️  Erro ao inserir categorias padrão:', categoriesInsertError.message);
    } else {
      console.log('✅ Categorias padrão inseridas com sucesso!');
    }

    // 9. Inserir métodos de pagamento padrão
    console.log('\n📝 Inserindo métodos de pagamento padrão...');
    const { error: paymentMethodsInsertError } = await supabase.rpc('exec_sql', {
      sql: `
        INSERT INTO payment_methods (name, user_id) VALUES
          ('Pix', NULL),
          ('Cartão de Crédito', NULL),
          ('Cartão de Débito', NULL),
          ('Dinheiro', NULL),
          ('Transferência Bancária', NULL),
          ('Boleto', NULL)
        ON CONFLICT DO NOTHING;
      `
    });

    if (paymentMethodsInsertError) {
      console.log('⚠️  Erro ao inserir métodos de pagamento padrão:', paymentMethodsInsertError.message);
    } else {
      console.log('✅ Métodos de pagamento padrão inseridos com sucesso!');
    }

    // 10. Verificar se as tabelas foram criadas
    console.log('\n🔍 Verificando estrutura das tabelas...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_type')
      .eq('table_schema', 'public')
      .in('table_name', ['transactions', 'categories', 'payment_methods']);

    if (tablesError) {
      console.log('⚠️  Erro ao verificar tabelas:', tablesError.message);
    } else {
      console.log('✅ Tabelas verificadas:', tables);
    }

    console.log('\n🎉 Configuração do banco de dados concluída!');
    console.log('\n📋 Resumo do que foi criado:');
    console.log('   • Tabela transactions');
    console.log('   • Tabela categories');
    console.log('   • Tabela payment_methods');
    console.log('   • Row Level Security (RLS) ativado');
    console.log('   • Políticas de segurança configuradas');
    console.log('   • Categorias padrão inseridas');
    console.log('   • Métodos de pagamento padrão inseridos');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error);
  }
}

// Executar a configuração
setupDatabase();
