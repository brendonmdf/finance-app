# Finance.ai - Plataforma de Gestão Financeira Inteligente

Uma plataforma moderna de gestão financeira construída com Next.js, TypeScript e Supabase, que permite aos usuários gerenciar suas finanças pessoais de forma inteligente e intuitiva.

## 🚀 Funcionalidades

- **Autenticação Segura**: Sistema de login e registro com Supabase Auth
- **Gestão de Transações**: Adicione, edite e gerencie receitas e despesas
- **Categorização Inteligente**: Categorias personalizáveis para organizar suas finanças
- **Dashboard Interativo**: Visualizações e gráficos em tempo real
- **Relatórios Detalhados**: Análises completas de suas movimentações
- **Orçamento**: Controle de gastos por categoria
- **Metas Financeiras**: Defina e acompanhe seus objetivos
- **Interface Responsiva**: Design moderno que funciona em todos os dispositivos

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, Shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## 🔧 Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd finance-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 4. Configure o banco de dados

Execute o script SQL fornecido no arquivo `supabase-schema.sql` no seu projeto Supabase:

```bash
# Acesse o dashboard do Supabase
# Vá para SQL Editor
# Execute o conteúdo do arquivo supabase-schema.sql
```

### 5. Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **profiles**: Perfis dos usuários
- **categories**: Categorias de transações
- **payment_methods**: Métodos de pagamento
- **transactions**: Transações financeiras
- **budgets**: Orçamentos
- **goals**: Metas financeiras

### Políticas de Segurança

Todas as tabelas possuem Row Level Security (RLS) configurado, garantindo que cada usuário só acesse seus próprios dados.

## 🔐 Autenticação

O sistema utiliza Supabase Auth com as seguintes funcionalidades:

- Registro com email e senha
- Login seguro
- Recuperação de senha
- Sessões persistentes
- Proteção de rotas

## 📱 Como Usar

### 1. Registro e Login
- Acesse `/auth/register` para criar uma conta
- Use `/auth/login` para fazer login

### 2. Primeiro Acesso
- Após o registro, categorias padrão são criadas automaticamente
- Métodos de pagamento básicos são configurados
- Comece adicionando suas primeiras transações

### 3. Adicionando Transações
- Clique em "Nova Transação" no dashboard
- Preencha título, valor, tipo, categoria e método de pagamento
- As transações aparecem automaticamente no dashboard

### 4. Visualizações
- Dashboard com resumo geral
- Gráficos de receitas vs despesas
- Análise por categorias
- Histórico completo de transações

## 🎨 Personalização

### Categorias
- Crie categorias personalizadas para receitas e despesas
- Defina cores e ícones para melhor visualização
- Organize suas finanças da forma que preferir

### Métodos de Pagamento
- Adicione seus métodos de pagamento preferidos
- Configure métodos padrão para facilitar o uso

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

A aplicação pode ser deployada em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

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

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se o banco de dados foi configurado corretamente
3. Verifique os logs do console para erros
4. Abra uma issue no repositório

## 🔮 Próximas Funcionalidades

- [ ] Notificações em tempo real
- [ ] Integração com bancos brasileiros
- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] App mobile (React Native)
- [ ] IA para categorização automática
- [ ] Metas financeiras com lembretes
- [ ] Backup automático dos dados

---

**Finance.ai** - Transformando a gestão financeira pessoal com tecnologia moderna e design intuitivo.
