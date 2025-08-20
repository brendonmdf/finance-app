# 🚀 Guia de Deploy na Vercel

Este guia irá te ajudar a fazer o deploy da aplicação Finance.ai na Vercel.

## 📋 Pré-requisitos

1. **Conta na Vercel**: [vercel.com](https://vercel.com)
2. **Conta no GitHub**: Para conectar o repositório
3. **Projeto no Supabase**: Para o banco de dados

## 🔧 Passo a Passo

### 1. Preparar o Repositório GitHub

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Finance.ai application"

# Adicionar o repositório remoto (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/finance-app.git

# Fazer push para o GitHub
git push -u origin main
```

### 2. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá para **Settings > API** e copie:
   - **Project URL**
   - **anon public key**

### 3. Deploy na Vercel

1. **Acesse a Vercel**: [vercel.com](https://vercel.com)
2. **Faça login** com sua conta GitHub
3. **Clique em "New Project"**
4. **Importe o repositório** `finance-app`
5. **Configure as variáveis de ambiente**:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

6. **Clique em "Deploy"**

### 4. Configurar o Banco de Dados

Após o deploy, execute este SQL no Supabase:

```sql
-- Tabela de transações
CREATE TABLE transactions (
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

-- Tabela de categorias
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Tabela de métodos de pagamento
CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Habilitar RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);
```

## 🌐 Domínio Personalizado (Opcional)

1. Na Vercel, vá para **Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções da Vercel

## 📱 Testando o Deploy

1. Acesse a URL fornecida pela Vercel
2. Verifique se todas as páginas estão funcionando:
   - Dashboard (`/`)
   - Transações (`/transactions`)
   - Assinatura (`/subscription`)

## 🔄 Deploy Automático

A Vercel fará deploy automático sempre que você fizer push para a branch `main` do GitHub.

## 🚨 Solução de Problemas

### Erro de Build
- Verifique se todas as dependências estão instaladas
- Confirme se as variáveis de ambiente estão configuradas
- Verifique os logs de build na Vercel

### Erro de Banco de Dados
- Confirme se as tabelas foram criadas no Supabase
- Verifique se as políticas RLS estão ativas
- Confirme se as variáveis de ambiente estão corretas

### Erro de CORS
- Configure as políticas de CORS no Supabase
- Verifique se o domínio da Vercel está na lista de permitidos

## 📊 Monitoramento

- **Vercel Analytics**: Para métricas de performance
- **Supabase Dashboard**: Para monitorar o banco de dados
- **Logs da Vercel**: Para debugging

## 🔒 Segurança

- ✅ HTTPS automático
- ✅ Variáveis de ambiente seguras
- ✅ RLS ativo no Supabase
- ✅ Headers de segurança automáticos

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs na Vercel
2. Consulte a documentação do Supabase
3. Abra uma issue no GitHub do projeto

---

**🎉 Parabéns! Sua aplicação Finance.ai está no ar!**
