# 🚀 Configuração Rápida - Finance.ai

## ⚡ Configuração em 5 minutos

### 1. 📋 Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git instalado

### 2. 🔑 Configurar Supabase

#### A. Criar projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou Google
4. Clique em "New Project"
5. Escolha uma organização
6. Digite um nome para o projeto (ex: "finance-ai")
7. Escolha uma senha forte para o banco
8. Escolha uma região (recomendo São Paulo)
9. Clique em "Create new project"

#### B. Obter credenciais
1. No dashboard do projeto, vá para "Settings" > "API"
2. Copie a "Project URL"
3. Copie a "anon public" key

### 3. 🛠️ Configurar o Projeto

#### A. Clone e instale
```bash
git clone <seu-repositorio>
cd finance-app
npm install
```

#### B. Criar arquivo de ambiente
Crie um arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

#### C. Configurar banco de dados
1. No Supabase, vá para "SQL Editor"
2. Clique em "New query"
3. Cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em "Run"

### 4. 🚀 Executar
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔧 Solução de Problemas

### Erro: "Supabase não está configurado"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor após criar o arquivo

### Erro: "Database connection failed"
- Verifique se o projeto Supabase está ativo
- Confirme se as credenciais estão corretas
- Verifique se o schema foi executado

### Erro: "Table doesn't exist"
- Execute novamente o arquivo `supabase-schema.sql`
- Verifique se não há erros no SQL

## 📱 Primeiro Uso

1. **Registre-se**: Acesse `/auth/register`
2. **Faça login**: Use suas credenciais
3. **Adicione transações**: Clique em "Nova Transação"
4. **Personalize**: Crie categorias e métodos de pagamento

## 🎯 Próximos Passos

- [ ] Adicione suas primeiras transações
- [ ] Crie categorias personalizadas
- [ ] Configure métodos de pagamento
- [ ] Explore o dashboard
- [ ] Configure metas financeiras

## 🆘 Ainda com Problemas?

1. Verifique os logs do terminal
2. Confirme se todas as etapas foram seguidas
3. Verifique se o Supabase está funcionando
4. Abra uma issue no repositório

---

**🎉 Parabéns!** Sua aplicação Finance.ai está configurada e pronta para uso!
