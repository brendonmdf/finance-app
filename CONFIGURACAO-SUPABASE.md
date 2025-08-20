# 🔧 Configuração do Supabase - Finance.ai

## ✅ Credenciais Configuradas

Seu projeto Supabase já está configurado com as seguintes credenciais:

- **Project ID**: `hyracsbdyykuhhpwnweyyj`
- **Project URL**: `https://hyracsbdyykuhhpwnweyyj.supabase.co`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYWNzYmR5eWt1aGhwbndleXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ1NzIsImV4cCI6MjA3MDg0MDU3Mn0.Gz0Cf4zKjCcc23-KEXBKJmEh9-vgqPv1rCM6S66YTPQ`

## 🚀 Passos para Configurar

### 1. Criar o arquivo .env.local

Crie um arquivo chamado `.env.local` na raiz do projeto `finance-app` com o seguinte conteúdo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hyracsbdyykuhhpwnweyyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYWNzYmR5eWt1aGhwbndleXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ1NzIsImV4cCI6MjA3MDg0MDU3Mn0.Gz0Cf4zKjCcc23-KEXBKJmEh9-vgqPv1rCM6S66YTPQ
```

### 2. Executar o Script SQL no Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto `hyracsbdyykuhhpwnweyyj`
3. Vá para **SQL Editor** no menu lateral
4. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
5. Clique em **Run** para executar o script

### 3. Verificar a Configuração

Após executar o script, você deve ver:

- ✅ 3 tabelas criadas: `transactions`, `categories`, `payment_methods`
- ✅ Row Level Security (RLS) ativado em todas as tabelas
- ✅ Políticas de segurança configuradas
- ✅ Categorias e métodos de pagamento padrão inseridos

## 🔒 Segurança Configurada

O projeto está configurado com:

- **Row Level Security (RLS)** ativo em todas as tabelas
- **Políticas de acesso** que garantem que usuários só vejam seus próprios dados
- **Validação de entrada** para tipos de transação
- **Referências de chave estrangeira** para integridade dos dados

## 📊 Estrutura das Tabelas

### Tabela `transactions`
- `id`: Identificador único (UUID)
- `title`: Título da transação
- `amount`: Valor (decimal com 2 casas)
- `type`: Tipo ('income' ou 'expense')
- `category`: Categoria da transação
- `payment_method`: Método de pagamento
- `date`: Data da transação
- `user_id`: ID do usuário (referência para auth.users)
- `created_at`: Timestamp de criação

### Tabela `categories`
- `id`: Identificador único (UUID)
- `name`: Nome da categoria
- `type`: Tipo ('income' ou 'expense')
- `color`: Cor para exibição
- `icon`: Ícone para exibição
- `user_id`: ID do usuário

### Tabela `payment_methods`
- `id`: Identificador único (UUID)
- `name`: Nome do método de pagamento
- `user_id`: ID do usuário

## 🧪 Testar a Conexão

Após configurar, teste a conexão:

1. **Inicie o projeto localmente**:
   ```bash
   cd finance-app
   npm run dev
   ```

2. **Acesse** `http://localhost:3000`

3. **Verifique se não há erros** no console do navegador

4. **Teste o modal** de adicionar transação

## 🚨 Solução de Problemas

### Erro de Conexão
- Verifique se o arquivo `.env.local` foi criado corretamente
- Confirme se as credenciais estão corretas
- Verifique se o projeto Supabase está ativo

### Erro de Tabelas
- Execute novamente o script SQL
- Verifique se as tabelas foram criadas em **Table Editor**
- Confirme se o RLS está ativo

### Erro de Políticas
- Verifique se as políticas foram criadas em **Authentication > Policies**
- Execute novamente as políticas de segurança

## 🔄 Próximos Passos

Após configurar o Supabase:

1. **Teste localmente** com `npm run dev`
2. **Faça commit** das alterações no Git
3. **Configure o deploy** na Vercel
4. **Configure as variáveis de ambiente** na Vercel

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do Supabase
2. Consulte a documentação oficial
3. Verifique se todas as tabelas e políticas foram criadas
4. Teste a conexão com um script simples

---

**🎉 Seu Supabase está configurado e pronto para uso!**
