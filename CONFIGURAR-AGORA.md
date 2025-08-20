# 🚀 CONFIGURAR SUPABASE AGORA - PASSO A PASSO

## ⚠️ IMPORTANTE: Siga TODOS os passos na ordem!

### 1️⃣ CRIAR ARQUIVO .env.local

1. **Na pasta `finance-app`, crie um arquivo chamado `.env.local`**
2. **Cole este conteúdo (SUBSTITUA pelos seus valores reais):**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SEU_ANON_KEY_AQUI
```

### 2️⃣ CRIAR PROJETO NO SUPABASE

1. **Acesse:** [https://supabase.com](https://supabase.com)
2. **Faça login** ou crie uma conta
3. **Clique em "New Project"**
4. **Preencha:**
   - Nome: `finance-ai` (ou o que preferir)
   - Database Password: `123456789` (senha forte)
   - Region: `São Paulo` (recomendado)
5. **Clique em "Create new project"**
6. **Aguarde** o projeto ser criado (pode demorar 2-3 minutos)

### 3️⃣ PEGAR AS CHAVES DO SUPABASE

1. **No seu projeto Supabase, vá para:**
   - `Settings` (⚙️) → `API`
2. **Copie estes valores:**
   - **Project URL** → cole no `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → cole no `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4️⃣ EXECUTAR O SCHEMA SQL

1. **No Supabase, vá para:**
   - `SQL Editor` (📝)
2. **Clique em "New query"**
3. **Cole TODO o conteúdo do arquivo `supabase-schema.sql`**
4. **Clique em "Run"** (▶️)
5. **Aguarde** todas as tabelas serem criadas

### 5️⃣ CONFIGURAR AUTENTICAÇÃO

1. **No Supabase, vá para:**
   - `Authentication` → `Settings`
2. **Em "Site URL" adicione:**
   ```
   http://localhost:3000
   ```
3. **Em "Redirect URLs" adicione:**
   ```
   http://localhost:3000/auth/login
   http://localhost:3000/auth/register
   ```
4. **Clique em "Save"**

### 6️⃣ TESTAR O SISTEMA

1. **Pare o servidor atual (Ctrl+C)**
2. **Execute novamente:**
   ```bash
   npm run dev
   ```
3. **Acesse:** [http://localhost:3000](http://localhost:3000)
4. **Teste:**
   - Clique em "Criar conta"
   - Preencha os dados
   - Faça login

---

## 🔧 EXEMPLO DE CONFIGURAÇÃO

### Seu arquivo `.env.local` deve ficar assim:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0NzI5MSwiZXhwIjoxOTUyMTIzMjkxfQ.EXEMPLO_DE_CHAVE_MUITO_LONGA
```

### ⚠️ ATENÇÃO:
- **NUNCA** compartilhe essas chaves
- **SEMPRE** reinicie o servidor após alterar `.env.local`
- **VERIFIQUE** se não há espaços extras nas chaves

---

## 🆘 SE DER ERRO:

### Erro "Failed to fetch":
- ✅ Verifique se as chaves estão corretas
- ✅ Reinicie o servidor (`npm run dev`)
- ✅ Confirme se o projeto Supabase está ativo

### Erro de autenticação:
- ✅ Verifique as URLs de redirecionamento
- ✅ Confirme se o schema SQL foi executado
- ✅ Teste com um usuário novo

---

## 📞 PRECISA DE AJUDA?

1. **Verifique** se seguiu TODOS os passos
2. **Confirme** se as chaves estão corretas
3. **Reinicie** o servidor
4. **Teste** novamente

---

## 🎯 RESULTADO ESPERADO:

Após seguir todos os passos:
- ✅ Login funcionando
- ✅ Registro funcionando
- ✅ Dashboard protegido
- ✅ Sistema 100% funcional

---

**🚀 AGORA É SÓ SEGUIR OS PASSOS E TESTAR!**
