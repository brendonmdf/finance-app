const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://hyracsbdyykuhhpwnweyyj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYWNzYmR5eWt1aGhwbndleXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ1NzIsImV4cCI6MjA3MDg0MDU3Mn0.Gz0Cf4zKjCcc23-KEXBKJmEh9-vgqPv1rCM6S66YTPQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Iniciando configuração do banco de dados...\n');

  try {
    // 1. Inserir categorias padrão
    console.log('📝 Inserindo categorias padrão...');
    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert([
        { name: 'Salário', type: 'income', color: '#22c55e', icon: 'dollar-sign' },
        { name: 'Freelancing', type: 'income', color: '#22c55e', icon: 'trending-up' },
        { name: 'Investimentos', type: 'income', color: '#22c55e', icon: 'trending-up' },
        { name: 'Moradia', type: 'expense', color: '#ef4444', icon: 'home' },
        { name: 'Alimentação', type: 'expense', color: '#ef4444', icon: 'utensils' },
        { name: 'Transporte', type: 'expense', color: '#ef4444', icon: 'car' },
        { name: 'Saúde', type: 'expense', color: '#ef4444', icon: 'heart' },
        { name: 'Educação', type: 'expense', color: '#ef4444', icon: 'book-open' },
        { name: 'Lazer', type: 'expense', color: '#ef4444', icon: 'smile' }
      ], { onConflict: 'name' });

    if (categoriesError) {
      console.log('⚠️  Erro ao inserir categorias:', categoriesError.message);
    } else {
      console.log('✅ Categorias padrão inseridas com sucesso!');
    }

    // 2. Inserir métodos de pagamento padrão
    console.log('\n📝 Inserindo métodos de pagamento padrão...');
    const { error: paymentMethodsError } = await supabase
      .from('payment_methods')
      .upsert([
        { name: 'Pix' },
        { name: 'Cartão de Crédito' },
        { name: 'Cartão de Débito' },
        { name: 'Dinheiro' },
        { name: 'Transferência Bancária' },
        { name: 'Boleto' }
      ], { onConflict: 'name' });

    if (paymentMethodsError) {
      console.log('⚠️  Erro ao inserir métodos de pagamento:', paymentMethodsError.message);
    } else {
      console.log('✅ Métodos de pagamento padrão inseridos com sucesso!');
    }

    // 3. Verificar se as tabelas existem
    console.log('\n🔍 Verificando estrutura das tabelas...');
    
    // Verificar tabela categories
    const { data: categories, error: categoriesCheckError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);

    if (categoriesCheckError) {
      console.log('⚠️  Erro ao verificar tabela categories:', categoriesCheckError.message);
    } else {
      console.log('✅ Tabela categories está funcionando');
    }

    // Verificar tabela payment_methods
    const { data: paymentMethods, error: paymentMethodsCheckError } = await supabase
      .from('payment_methods')
      .select('*')
      .limit(1);

    if (paymentMethodsCheckError) {
      console.log('⚠️  Erro ao verificar tabela payment_methods:', paymentMethodsCheckError.message);
    } else {
      console.log('✅ Tabela payment_methods está funcionando');
    }

    // Verificar tabela transactions
    const { data: transactions, error: transactionsCheckError } = await supabase
      .from('transactions')
      .select('*')
      .limit(1);

    if (transactionsCheckError) {
      console.log('⚠️  Erro ao verificar tabela transactions:', transactionsCheckError.message);
    } else {
      console.log('✅ Tabela transactions está funcionando');
    }

    console.log('\n🎉 Verificação do banco de dados concluída!');
    console.log('\n📋 Resumo do que foi verificado:');
    console.log('   • Tabela categories');
    console.log('   • Tabela payment_methods');
    console.log('   • Tabela transactions');
    console.log('   • Categorias padrão inseridas');
    console.log('   • Métodos de pagamento padrão inseridos');

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
  }
}

// Executar a verificação
setupDatabase();
