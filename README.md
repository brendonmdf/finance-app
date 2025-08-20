# Finance.ai - Plataforma de Gestão Financeira

Uma aplicação moderna de gestão financeira construída com Next.js, TypeScript e Tailwind CSS, com design inspirado em dashboards financeiros profissionais.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visão geral das finanças com gráficos e métricas
- **Gestão de Transações**: Adicionar, editar e categorizar transações
- **Análise por Categoria**: Visualização de gastos e receitas por categoria
- **Gráficos Interativos**: Gráficos de rosca e barras para análise visual
- **Responsivo**: Interface adaptável para desktop e mobile
- **Tema Escuro**: Design moderno com tema escuro por padrão

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Ícones**: Lucide React
- **Gráficos**: Recharts
- **Banco de Dados**: Supabase (configurável)
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (opcional para desenvolvimento)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd finance-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. **Execute o projeto**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🗄️ Configuração do Supabase

### 1. Crie um projeto no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie uma nova conta ou faça login
- Crie um novo projeto

### 2. Configure as tabelas
Execute os seguintes comandos SQL no editor SQL do Supabase:

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

-- Habilitar RLS (Row Level Security)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança básicas
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Configure autenticação
- No painel do Supabase, vá para Authentication > Settings
- Configure os provedores de autenticação desejados (Google, GitHub, etc.)

## 🚀 Deploy na Vercel

### 1. Conecte com GitHub
- Faça push do código para um repositório GitHub
- Acesse [vercel.com](https://vercel.com)
- Conecte sua conta GitHub

### 2. Configure o projeto
- Clique em "New Project"
- Selecione o repositório `finance-app`
- Configure as variáveis de ambiente:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Deploy
- Clique em "Deploy"
- Aguarde o build e deploy automático

## 📱 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página do dashboard
│   ├── transactions/      # Página de transações
│   └── subscription/      # Página de assinatura
├── components/            # Componentes reutilizáveis
│   ├── Navigation.tsx     # Navegação principal
│   ├── BalanceCard.tsx    # Card de saldo
│   ├── MetricCard.tsx     # Cards de métricas
│   ├── DonutChart.tsx     # Gráfico de rosca
│   ├── ExpensesByCategory.tsx # Gastos por categoria
│   ├── TransactionsList.tsx   # Lista de transações
│   └── AddTransactionModal.tsx # Modal de nova transação
└── lib/                   # Utilitários e configurações
    └── supabase.ts        # Configuração do Supabase
```

## 🎨 Personalização

### Cores
As cores podem ser personalizadas no arquivo `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#22c55e', // Cor principal
  },
  dark: {
    950: '#020617', // Fundo principal
  }
}
```

### Componentes
Todos os componentes estão na pasta `src/components/` e podem ser facilmente modificados para atender às suas necessidades.

## 🔒 Segurança

- **RLS (Row Level Security)**: Implementado no Supabase para proteger dados dos usuários
- **Autenticação**: Sistema de autenticação robusto com múltiplos provedores
- **Validação**: Validação de entrada em todos os formulários
- **HTTPS**: Forçado em produção pela Vercel

## 📊 Funcionalidades Futuras

- [ ] Relatórios avançados com IA
- [ ] Integração com bancos brasileiros
- [ ] Notificações push
- [ ] App mobile nativo
- [ ] Exportação para Excel/PDF
- [ ] Múltiplas moedas
- [ ] Backup automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a documentação
2. Procure por issues existentes
3. Crie uma nova issue com detalhes do problema

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Supabase](https://supabase.com/) - Backend como serviço
- [Vercel](https://vercel.com/) - Plataforma de deploy
- [Lucide](https://lucide.dev/) - Ícones
- [Recharts](https://recharts.org/) - Gráficos React

---

**Finance.ai** - Transformando a gestão financeira com tecnologia moderna e design intuitivo.
