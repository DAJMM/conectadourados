# Sistema de Autenticação - Conecta Dourados

## 🔐 Visão Geral

Sistema completo de autenticação integrado com **Supabase**, incluindo:

- ✅ Login e Cadastro
- ✅ Recuperação de senha
- ✅ Proteção de rotas administrativas
- ✅ Gerenciamento de sessão
- ✅ Perfis de usuário com RLS (Row Level Security)

## 📁 Estrutura de Arquivos

```
src/
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticação
├── components/
│   ├── Header.tsx               # Header com estado de autenticação
│   └── ProtectedRoute.tsx       # Componente para proteger rotas
├── pages/
│   ├── Login.tsx                # Página de login
│   ├── Signup.tsx               # Página de cadastro
│   └── ForgotPassword.tsx       # Página de recuperação de senha
├── lib/
│   └── supabase.ts              # Cliente Supabase configurado
└── App.tsx                      # Rotas configuradas
```

## 🚀 Como Usar

### 1. Rotas Disponíveis

- `/login` - Página de login
- `/signup` - Página de cadastro
- `/forgot-password` - Recuperação de senha
- `/admin/*` - Rotas protegidas (requer autenticação)

### 2. Criar uma Conta

1. Acesse `/signup`
2. Preencha nome, e-mail e senha
3. Confirme o e-mail (verifique sua caixa de entrada)
4. Faça login em `/login`

### 3. Fazer Login

1. Acesse `/login`
2. Digite e-mail e senha
3. Será redirecionado para `/admin`

### 4. Recuperar Senha

1. Acesse `/forgot-password`
2. Digite seu e-mail
3. Verifique sua caixa de entrada para instruções

## 🛠️ Configuração do Supabase

### Tabelas Criadas

#### `profiles`
Tabela para armazenar informações adicionais dos usuários:

```sql
- id (UUID) - Referência ao auth.users
- full_name (TEXT) - Nome completo
- avatar_url (TEXT) - URL do avatar
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Políticas de Segurança (RLS)

- ✅ Todos podem visualizar perfis públicos
- ✅ Usuários podem inserir apenas seu próprio perfil
- ✅ Usuários podem atualizar apenas seu próprio perfil

### Triggers Automáticos

1. **on_auth_user_created**: Cria automaticamente um perfil quando um usuário se cadastra
2. **on_profile_updated**: Atualiza automaticamente o campo `updated_at`

## 💻 Uso no Código

### Acessar Dados do Usuário

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, session, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Não autenticado</div>;

  return <div>Olá, {user.email}</div>;
}
```

### Fazer Login Programaticamente

```tsx
const { signIn } = useAuth();

const handleLogin = async () => {
  const { error } = await signIn(email, password);
  if (error) {
    console.error('Erro ao fazer login:', error.message);
  }
};
```

### Fazer Logout

```tsx
const { signOut } = useAuth();

const handleLogout = async () => {
  await signOut();
  navigate('/');
};
```

### Proteger uma Rota

```tsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## 🔑 Variáveis de Ambiente

As credenciais do Supabase estão configuradas em `.env`:

```env
VITE_SUPABASE_URL=https://ajnwryyoaqapjxuucgzf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📧 Configuração de E-mail

O Supabase enviará e-mails automaticamente para:
- Confirmação de cadastro
- Recuperação de senha
- Alteração de e-mail

Configure os templates de e-mail no painel do Supabase em:
**Authentication > Email Templates**

## 🎨 Design

Todas as páginas de autenticação seguem um design moderno e consistente:
- Gradientes vibrantes
- Ícones do Lucide React
- Feedback visual de erros e sucessos
- Responsivo para mobile e desktop
- Animações suaves

## 🔒 Segurança

- ✅ Senhas criptografadas pelo Supabase
- ✅ JWT tokens para autenticação
- ✅ Row Level Security (RLS) habilitado
- ✅ Validação de e-mail obrigatória
- ✅ Proteção contra SQL injection
- ✅ HTTPS obrigatório em produção

## 📝 Próximos Passos

1. Personalizar templates de e-mail no Supabase
2. Adicionar autenticação social (Google, GitHub, etc.)
3. Implementar autenticação de dois fatores (2FA)
4. Adicionar campos personalizados ao perfil
5. Criar página de configurações de conta

## 🐛 Troubleshooting

### Erro: "Invalid login credentials"
- Verifique se o e-mail está confirmado
- Certifique-se de que a senha está correta
- Verifique se o usuário existe no Supabase

### Erro: "Email not confirmed"
- Verifique a caixa de entrada do e-mail
- Reenvie o e-mail de confirmação no painel do Supabase

### Usuário não é redirecionado após login
- Verifique se o AuthProvider está envolvendo o BrowserRouter
- Verifique se as rotas estão configuradas corretamente

## 📚 Recursos

- [Documentação do Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [React Router v6](https://reactrouter.com/)
