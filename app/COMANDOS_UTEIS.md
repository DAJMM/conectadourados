# 🛠️ COMANDOS ÚTEIS - Gestão de Usuários e Roles

## 📊 Consultas SQL Úteis

### 1. Ver Todos os Usuários e Seus Roles
```sql
SELECT 
    id,
    email,
    role,
    full_name,
    created_at,
    updated_at
FROM profiles 
ORDER BY 
    CASE role 
        WHEN 'admin' THEN 1 
        WHEN 'user' THEN 2 
    END,
    created_at DESC;
```

### 2. Contar Usuários por Role
```sql
SELECT 
    role,
    COUNT(*) as total,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentual
FROM profiles 
GROUP BY role
ORDER BY total DESC;
```

### 3. Ver Apenas Administradores
```sql
SELECT 
    id,
    email,
    full_name,
    created_at
FROM profiles 
WHERE role = 'admin'
ORDER BY created_at;
```

### 4. Ver Últimos Usuários Cadastrados
```sql
SELECT 
    email,
    role,
    full_name,
    created_at
FROM profiles 
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🔧 Operações de Manutenção

### Promover Usuário a Admin
```sql
-- CUIDADO: Use apenas quando necessário
UPDATE profiles 
SET role = 'admin', updated_at = NOW()
WHERE email = 'email@exemplo.com';
```

### Rebaixar Admin para User
```sql
-- ATENÇÃO: Não funciona para diegoabelino@gmail.com (protegido por trigger)
UPDATE profiles 
SET role = 'user', updated_at = NOW()
WHERE email = 'email@exemplo.com' 
AND email != 'diegoabelino@gmail.com';
```

### Verificar se Usuário é Admin
```sql
SELECT 
    email,
    role,
    CASE 
        WHEN role = 'admin' THEN '✅ É Admin'
        ELSE '❌ Não é Admin'
    END as status_admin
FROM profiles 
WHERE email = 'email@exemplo.com';
```

### Garantir que Admin Master Está Configurado
```sql
-- Executar sempre que houver dúvida
UPDATE profiles 
SET role = 'admin', updated_at = NOW()
WHERE email = 'diegoabelino@gmail.com';

-- Verificar
SELECT email, role FROM profiles WHERE email = 'diegoabelino@gmail.com';
```

---

## 🔍 Diagnóstico e Debug

### Verificar Triggers Ativos
```sql
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table = 'profiles';
```

### Verificar Políticas RLS
```sql
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Testar Função is_admin()
```sql
-- Executar como usuário autenticado
SELECT public.is_admin() as sou_admin;
```

### Ver Índices da Tabela Profiles
```sql
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'profiles'
AND schemaname = 'public';
```

---

## 🧹 Limpeza e Manutenção

### Remover Usuários de Teste
```sql
-- CUIDADO: Isso remove permanentemente os dados
DELETE FROM profiles 
WHERE email LIKE '%teste%' 
OR email LIKE '%test%'
AND email != 'diegoabelino@gmail.com';
```

### Atualizar Timestamps
```sql
-- Atualizar updated_at para todos os perfis
UPDATE profiles 
SET updated_at = NOW()
WHERE updated_at IS NULL;
```

### Limpar Perfis Sem Email
```sql
-- Remover perfis órfãos (se houver)
DELETE FROM profiles 
WHERE email IS NULL 
OR email = '';
```

---

## 📈 Estatísticas e Relatórios

### Usuários Cadastrados por Dia
```sql
SELECT 
    DATE(created_at) as data,
    COUNT(*) as novos_usuarios,
    SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins,
    SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as users
FROM profiles 
GROUP BY DATE(created_at)
ORDER BY data DESC
LIMIT 30;
```

### Usuários Mais Ativos (com anúncios)
```sql
SELECT 
    p.email,
    p.role,
    COUNT(a.id) as total_anuncios
FROM profiles p
LEFT JOIN anuncios a ON p.id = a.usuario_id
GROUP BY p.id, p.email, p.role
ORDER BY total_anuncios DESC
LIMIT 10;
```

### Perfis Completos vs Incompletos
```sql
SELECT 
    CASE 
        WHEN full_name IS NOT NULL THEN 'Completo'
        ELSE 'Incompleto'
    END as status_perfil,
    COUNT(*) as total
FROM profiles
GROUP BY 
    CASE 
        WHEN full_name IS NOT NULL THEN 'Completo'
        ELSE 'Incompleto'
    END;
```

---

## 🔐 Segurança

### Verificar Usuários Sem Autenticação
```sql
-- Verificar se há perfis sem usuário correspondente no auth.users
SELECT p.email
FROM profiles p
LEFT JOIN auth.users u ON p.id = u.id
WHERE u.id IS NULL;
```

### Auditoria de Admins
```sql
SELECT 
    email,
    full_name,
    created_at,
    updated_at,
    EXTRACT(DAY FROM NOW() - created_at) as dias_desde_criacao
FROM profiles 
WHERE role = 'admin'
ORDER BY created_at;
```

---

## 🚀 Comandos do Terminal

### Iniciar Servidor de Desenvolvimento
```bash
cd "d:\Canecta Dourados 19-01-26\Conecta Dourados\conectadourados\app"
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Verificar Erros de TypeScript
```bash
npm run type-check
```

### Limpar Cache e Reinstalar
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 🎯 Atalhos do Supabase MCP

### Listar Todos os Projetos
```typescript
mcp_supabase-mcp-server_list_projects()
```

### Executar SQL
```typescript
mcp_supabase-mcp-server_execute_sql({
  project_id: "ajnwryyoaqapjxuucgzf",
  query: "SELECT * FROM profiles LIMIT 5"
})
```

### Listar Tabelas
```typescript
mcp_supabase-mcp-server_list_tables({
  project_id: "ajnwryyoaqapjxuucgzf",
  schemas: ["public"]
})
```

### Aplicar Migration
```typescript
mcp_supabase-mcp-server_apply_migration({
  project_id: "ajnwryyoaqapjxuucgzf",
  name: "nome_da_migration",
  query: "-- SQL aqui"
})
```

---

## 📝 Notas Importantes

### ⚠️ NUNCA Faça Isso
```sql
-- ❌ NUNCA remova o role do admin master
UPDATE profiles SET role = 'user' WHERE email = 'diegoabelino@gmail.com';
-- (Não funcionará devido ao trigger de proteção)

-- ❌ NUNCA desative o RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- ❌ NUNCA remova os triggers de proteção
DROP TRIGGER set_user_role_on_insert ON profiles;
DROP TRIGGER protect_admin_role_on_update ON profiles;
```

### ✅ Sempre Faça Isso
```sql
-- ✅ Sempre verifique antes de alterar roles
SELECT email, role FROM profiles WHERE email = 'email@exemplo.com';

-- ✅ Sempre use transações para operações críticas
BEGIN;
UPDATE profiles SET role = 'admin' WHERE email = 'novo@admin.com';
-- Verificar resultado
SELECT email, role FROM profiles WHERE email = 'novo@admin.com';
COMMIT; -- ou ROLLBACK se algo estiver errado

-- ✅ Sempre faça backup antes de operações em massa
-- (Use o painel do Supabase para criar backups)
```

---

## 🔗 Links Úteis

- **Painel Supabase**: https://supabase.com/dashboard/project/ajnwryyoaqapjxuucgzf
- **Documentação Supabase**: https://supabase.com/docs
- **SQL Editor**: https://supabase.com/dashboard/project/ajnwryyoaqapjxuucgzf/sql
- **Table Editor**: https://supabase.com/dashboard/project/ajnwryyoaqapjxuucgzf/editor
- **Auth Users**: https://supabase.com/dashboard/project/ajnwryyoaqapjxuucgzf/auth/users

---

**Última Atualização**: 2026-01-23  
**Projeto**: Conecta Dourados  
**Database**: ajnwryyoaqapjxuucgzf
