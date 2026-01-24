# 🔐 Guia de Teste: Login Admin e Área do Anunciante

## ✅ Correções Aplicadas

### 1. **Chave do Supabase Corrigida**
- **Problema**: A `VITE_SUPABASE_ANON_KEY` estava truncada no arquivo `.env.local`
- **Solução**: Atualizada com a chave completa do Supabase
- **Status**: ✅ Corrigido

### 2. **Banco de Dados Verificado**
- **Tabela `profiles`**: ✅ Coluna `role` existe
- **Admin Master**: ✅ `diegoabelino@gmail.com` está configurado como `admin`
- **Triggers**: ✅ Funcionando corretamente
- **RLS Policies**: ✅ Configuradas

### 3. **Código Frontend Verificado**
- **AuthContext**: ✅ Busca o role corretamente
- **ProtectedRoute**: ✅ Valida roles e redireciona
- **Login**: ✅ Redireciona baseado no role
- **AreaDoCliente**: ✅ Protegida para usuários comuns
- **Admin**: ✅ Protegido para admins

---

## 🧪 Como Testar

### **Passo 1: Verificar o Servidor**
O servidor de desenvolvimento está rodando em: **http://localhost:5173**

### **Passo 2: Testar Login como Admin**

1. Abra o navegador e acesse: **http://localhost:5173/login**

2. Faça login com as credenciais do admin:
   ```
   Email: diegoabelino@gmail.com
   Senha: [sua senha cadastrada]
   ```

3. **Resultado Esperado**:
   - ✅ Login bem-sucedido
   - ✅ Redirecionamento automático para `/admin`
   - ✅ Visualização do Dashboard Admin
   - ✅ Header mostra "👑 Admin"

4. **Se o login falhar**:
   - Verifique se você já criou uma conta com este email
   - Se não, crie uma conta em `/signup` com este email
   - O sistema automaticamente definirá o role como `admin`

### **Passo 3: Testar Login como Usuário Comum**

1. Acesse: **http://localhost:5173/login**

2. Faça login com qualquer outro email (não `diegoabelino@gmail.com`):
   ```
   Email: teste@exemplo.com
   Senha: [sua senha]
   ```

3. **Resultado Esperado**:
   - ✅ Login bem-sucedido
   - ✅ Redirecionamento automático para `/area-do-cliente`
   - ✅ Visualização da Área do Anunciante
   - ✅ Menu com opções: Meus Anúncios, Meu Perfil, etc.

### **Passo 4: Testar Proteção de Rotas**

#### Como Admin:
1. Após fazer login como admin, tente acessar: **http://localhost:5173/area-do-cliente**
2. **Resultado Esperado**: ✅ Redirecionamento automático para `/admin`

#### Como Usuário:
1. Após fazer login como usuário, tente acessar: **http://localhost:5173/admin**
2. **Resultado Esperado**: ✅ Redirecionamento automático para `/area-do-cliente`

### **Passo 5: Testar Área do Anunciante**

1. Faça login como usuário comum
2. Você deve ver:
   - ✅ Header com seu nome
   - ✅ Estatísticas rápidas (Anúncios Ativos, Mensagens, Avaliação)
   - ✅ Menu com opções:
     - 📢 Meus Anúncios
     - 👤 Meu Perfil
     - 💬 Mensagens (Em breve)
     - ⭐ Avaliações (Em breve)
     - 🔔 Notificações (Em breve)
     - ⚙️ Configurações (Em breve)

3. Clique em "Meus Anúncios":
   - ✅ Deve redirecionar para `/meus-anuncios`
   - ✅ Deve mostrar seus anúncios ou opção para criar novo

---

## 🔍 Verificação do Banco de Dados

### Verificar Role do Admin
Execute no console do Supabase ou via MCP:

```sql
SELECT id, email, role FROM profiles WHERE email = 'diegoabelino@gmail.com';
```

**Resultado Esperado**:
```
role: "admin"
```

### Verificar Todos os Usuários
```sql
SELECT email, role FROM profiles ORDER BY created_at;
```

---

## 🐛 Solução de Problemas

### Problema: "Erro ao fazer login"

**Possíveis Causas**:
1. Senha incorreta
2. Email não cadastrado
3. Problema de conexão com Supabase

**Solução**:
1. Verifique se a conta existe no Supabase
2. Tente redefinir a senha
3. Verifique o console do navegador (F12) para erros

### Problema: "Área do Anunciante não carrega"

**Possíveis Causas**:
1. Usuário não está autenticado
2. Role não está sendo carregado corretamente
3. Erro de JavaScript

**Solução**:
1. Faça logout e login novamente
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Verifique o console do navegador (F12) para erros
4. Verifique se o role está correto no banco de dados

### Problema: "Redirecionamento em loop"

**Possíveis Causas**:
1. Role não está sendo retornado do banco de dados
2. Conflito nas rotas protegidas

**Solução**:
1. Verifique o console do navegador
2. Confirme que o role existe no banco de dados
3. Tente fazer logout e login novamente

### Problema: "Admin não consegue acessar /admin"

**Solução**:
1. Verifique o role no banco de dados:
```sql
SELECT email, role FROM profiles WHERE email = 'diegoabelino@gmail.com';
```

2. Se não for 'admin', atualize:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'diegoabelino@gmail.com';
```

3. Faça logout e login novamente

---

## 📊 Status da Implementação

| Componente | Status | Descrição |
|------------|--------|-----------|
| Banco de Dados | ✅ | Coluna `role`, triggers e RLS configurados |
| AuthContext | ✅ | Busca e armazena role do usuário |
| ProtectedRoute | ✅ | Valida roles e redireciona |
| Login | ✅ | Redireciona baseado no role |
| Área do Cliente | ✅ | Protegida para usuários comuns |
| Painel Admin | ✅ | Protegido para admins |
| Header | ✅ | Mostra informações baseadas no role |
| Chave Supabase | ✅ | Corrigida no .env.local |

---

## 🎯 Próximos Passos

1. **Teste Manual**:
   - Abra http://localhost:5173/login
   - Faça login como admin e usuário
   - Verifique os redirecionamentos
   - Teste a área do anunciante

2. **Criar Anúncios**:
   - Como usuário, acesse "Meus Anúncios"
   - Clique em "Criar Novo Anúncio"
   - Preencha os dados e salve

3. **Verificar Funcionalidades**:
   - Upload de fotos
   - Edição de anúncios
   - Exclusão de anúncios

---

## 📞 Informações Importantes

- **URL Local**: http://localhost:5173
- **Admin Master**: diegoabelino@gmail.com
- **Projeto Supabase**: ajnwryyoaqapjxuucgzf
- **Região**: sa-east-1 (São Paulo)

---

## ✅ Checklist de Teste

- [ ] Login como admin funciona
- [ ] Redirecionamento para /admin funciona
- [ ] Dashboard admin carrega corretamente
- [ ] Login como usuário funciona
- [ ] Redirecionamento para /area-do-cliente funciona
- [ ] Área do anunciante carrega corretamente
- [ ] Proteção de rotas funciona (admin não acessa área do cliente)
- [ ] Proteção de rotas funciona (usuário não acessa admin)
- [ ] "Meus Anúncios" funciona
- [ ] Criação de anúncios funciona
- [ ] Upload de fotos funciona

---

**Data**: 2026-01-23  
**Status**: ✅ Sistema Pronto para Teste  
**Servidor**: http://localhost:5173
