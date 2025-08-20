# 🚀 Configuração Completa do Supabase para Finance.ai

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Node.js e npm instalados

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite um nome para o projeto (ex: "finance-ai")
6. Escolha uma senha forte para o banco
7. Escolha uma região (recomendado: São Paulo)
8. Clique em "Create new project"

### 2. Configurar Variáveis de Ambiente

1. No seu projeto, crie um arquivo `.env.local` na raiz
2. Adicione as seguintes variáveis:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

3. Para encontrar essas informações:
   - Vá para "Settings" > "API" no seu projeto Supabase
   - Copie a "Project URL" para `NEXT_PUBLIC_SUPABASE_URL`
   - Copie a "anon public" para `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Executar o Schema SQL

1. No Supabase, vá para "SQL Editor"
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor SQL
5. Clique em "Run" para executar

### 4. Configurar Autenticação

1. No Supabase, vá para "Authentication" > "Settings"
2. Em "Site URL", adicione: `http://localhost:3000`
3. Em "Redirect URLs", adicione:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/login`
   - `http://localhost:3000/auth/register`

### 5. Configurar Email (Opcional)

1. Em "Authentication" > "Settings" > "SMTP Settings"
2. Configure seu provedor de email (Gmail, SendGrid, etc.)
3. Ou use o email padrão do Supabase para testes

## 🗄️ Estrutura do Banco

### Tabelas Principais

- **`profiles`** - Perfis dos usuários
- **`categories`** - Categorias de transações
- **`payment_methods`** - Métodos de pagamento
- **`accounts`** - Contas bancárias
- **`transactions`** - Transações financeiras
- **`budgets`** - Orçamentos
- **`goals`** - Metas financeiras
- **`recurring_transactions`** - Transações recorrentes
- **`notifications`** - Notificações

### Funcionalidades

- ✅ Autenticação completa (login/registro)
- ✅ Perfis de usuário
- ✅ Categorias personalizáveis
- ✅ Múltiplas contas
- ✅ Transações com metadados
- ✅ Orçamentos por categoria
- ✅ Metas financeiras
- ✅ Transações recorrentes
- ✅ Sistema de notificações
- ✅ Políticas de segurança (RLS)
- ✅ Triggers automáticos

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- **Políticas de acesso** baseadas no usuário autenticado
- **Triggers automáticos** para criação de perfis
- **Validação de dados** com constraints SQL

## 🚀 Testando

1. Execute o projeto: `npm run dev`
2. Acesse: `http://localhost:3000`
3. Você será redirecionado para `/auth/login`
4. Crie uma conta ou faça login
5. Teste todas as funcionalidades

## 📱 Funcionalidades Disponíveis

- 🔐 **Autenticação**: Login/Registro com email
- 👤 **Perfil**: Nome, email, moeda, timezone
- 📊 **Dashboard**: Visão geral das finanças
- 💰 **Transações**: Adicionar, editar, excluir
- 🏷️ **Categorias**: Personalizáveis com cores e ícones
- 💳 **Métodos de Pagamento**: Dinheiro, cartões, PIX, etc.
- 🏦 **Contas**: Múltiplas contas bancárias
- 📈 **Orçamentos**: Controle por categoria
- 🎯 **Metas**: Objetivos financeiros
- 🔄 **Recorrências**: Transações automáticas
- 🔔 **Notificações**: Sistema de alertas

## 🆘 Solução de Problemas

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de Autenticação
- Verifique as URLs de redirecionamento
- Confirme se o schema SQL foi executado

### Erro de Permissão
- Verifique se as políticas RLS estão ativas
- Confirme se o usuário está autenticado

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console
2. Confirme a configuração do Supabase
3. Teste com um usuário novo
4. Verifique se todas as tabelas foram criadas

---

**🎉 Parabéns! Seu sistema Finance.ai está configurado e funcionando!**
