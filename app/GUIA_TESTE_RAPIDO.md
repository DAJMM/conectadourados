# 🧪 GUIA RÁPIDO DE TESTE - Separação Admin/Usuário

## ✅ Servidor Rodando!

**URL**: http://localhost:5173/

---

## 🎯 Testes a Realizar

### 1️⃣ Teste como Administrador

#### Credenciais
```
Email: diegoabelino@gmail.com
Senha: [sua senha cadastrada]
```

#### Passos
1. ✅ Acesse: http://localhost:5173/login
2. ✅ Faça login com as credenciais acima
3. ✅ **Esperado**: Redireciona para `/admin`
4. ✅ **Verificar**: Header mostra "👑 Admin"
5. ✅ Tente acessar: http://localhost:5173/area-do-cliente
6. ✅ **Esperado**: Redireciona de volta para `/admin`

#### O Que Você Deve Ver
- Dashboard administrativo
- Menu lateral com opções de admin
- Acesso a:
  - Dashboard
  - Profissionais
  - Clientes
  - Assinaturas
  - Configurações

---

### 2️⃣ Teste como Usuário Comum

#### Opção A: Usar Conta Existente
```
Email: [qualquer email cadastrado, exceto diegoabelino@gmail.com]
Senha: [senha da conta]
```

#### Opção B: Criar Nova Conta
1. ✅ Acesse: http://localhost:5173/signup
2. ✅ Preencha os dados:
   - Nome completo
   - Email (use um email diferente)
   - Senha (mínimo 6 caracteres)
   - Confirmar senha
3. ✅ Clique em "Criar conta"
4. ✅ **Importante**: Verifique seu email e confirme a conta
5. ✅ Volte para: http://localhost:5173/login
6. ✅ Faça login com as novas credenciais

#### Passos de Teste
1. ✅ Faça login
2. ✅ **Esperado**: Redireciona para `/area-do-cliente`
3. ✅ **Verificar**: Header mostra seu nome de usuário
4. ✅ Tente acessar: http://localhost:5173/admin
5. ✅ **Esperado**: Redireciona de volta para `/area-do-cliente`

#### O Que Você Deve Ver
- Área do cliente personalizada
- Estatísticas rápidas (anúncios, mensagens, avaliações)
- Menu com opções:
  - Meus Anúncios
  - Meu Perfil
  - Mensagens (em breve)
  - Avaliações (em breve)
  - Notificações (em breve)
  - Configurações (em breve)

---

### 3️⃣ Teste de Alternância entre Contas

#### Teste de Logout/Login
1. ✅ Faça login como **admin**
2. ✅ Clique em "Sair" no header
3. ✅ Faça login como **usuário comum**
4. ✅ **Verificar**: Redireciona para área correta
5. ✅ **Verificar**: Header mostra informação correta
6. ✅ Repita o processo invertendo as contas

---

### 4️⃣ Teste de Proteção de Rotas

#### URLs para Testar (sem estar logado)
```
http://localhost:5173/admin
http://localhost:5173/area-do-cliente
```

**Esperado**: Ambas redirecionam para `/login`

#### URLs para Testar (logado como user)
```
http://localhost:5173/admin
```

**Esperado**: Redireciona para `/area-do-cliente`

#### URLs para Testar (logado como admin)
```
http://localhost:5173/area-do-cliente
```

**Esperado**: Redireciona para `/admin`

---

## 🎨 Diferenças Visuais a Observar

### Header

#### Admin (diegoabelino@gmail.com)
```
┌─────────────────────────────────────┐
│ 👤 👑 Admin    [Botão Sair]         │
└─────────────────────────────────────┘
```

#### Usuário Comum
```
┌─────────────────────────────────────┐
│ 👤 nome_usuario    [Botão Sair]     │
└─────────────────────────────────────┘
```

### Páginas

#### `/admin` (Apenas Admin)
- Layout com sidebar
- Dashboard com métricas
- Gestão de profissionais
- Gestão de clientes
- Gestão de assinaturas

#### `/area-do-cliente` (Apenas User)
- Cards com estatísticas
- Menu de opções do cliente
- Gestão de anúncios pessoais
- Perfil do usuário

---

## ✅ Checklist de Validação

### Funcionalidades Básicas
- [ ] Login como admin redireciona para `/admin`
- [ ] Login como user redireciona para `/area-do-cliente`
- [ ] Header mostra "👑 Admin" para admin
- [ ] Header mostra nome do usuário para user
- [ ] Logout funciona corretamente
- [ ] Redirecionamento de rotas protegidas funciona

### Segurança
- [ ] Admin não consegue acessar `/area-do-cliente`
- [ ] User não consegue acessar `/admin`
- [ ] Usuário não logado é redirecionado para `/login`
- [ ] Após login, usuário vai para área correta

### Interface
- [ ] Header diferenciado para admin e user
- [ ] Área do cliente mostra opções corretas
- [ ] Painel admin mostra opções corretas
- [ ] Transições e animações funcionam

---

## 🐛 Problemas Comuns

### "Não consigo fazer login como admin"
**Solução**: Verifique se está usando o email correto: `diegoabelino@gmail.com`

### "Sou redirecionado em loop"
**Solução**: 
1. Faça logout
2. Limpe o cache do navegador (Ctrl + Shift + Delete)
3. Feche e abra o navegador
4. Tente novamente

### "Header não mostra '👑 Admin'"
**Solução**:
1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Faça logout e login novamente
4. Verifique se o role está sendo carregado

### "Não recebo email de confirmação"
**Solução**:
1. Verifique a pasta de spam
2. Aguarde alguns minutos
3. Tente cadastrar com outro email
4. Verifique configurações do Supabase

---

## 📊 Verificação no Banco de Dados

### Verificar Role de um Usuário
Acesse o painel do Supabase:
1. Vá para: https://supabase.com/dashboard/project/ajnwryyoaqapjxuucgzf
2. Clique em "Table Editor"
3. Selecione a tabela `profiles`
4. Procure pelo email do usuário
5. Verifique a coluna `role`

**Valores possíveis**:
- `admin` - Administrador
- `user` - Usuário comum

---

## 🎯 Resultado Esperado

Após todos os testes, você deve ter:

✅ **Admin (diegoabelino@gmail.com)**
- Acesso total ao painel `/admin`
- Badge "👑 Admin" no header
- Não consegue acessar `/area-do-cliente`

✅ **Usuários Comuns**
- Acesso apenas ao `/area-do-cliente`
- Nome exibido no header
- Não conseguem acessar `/admin`

✅ **Segurança**
- Rotas protegidas funcionando
- Redirecionamentos automáticos
- Separação clara de permissões

---

## 📞 Suporte

Se encontrar algum problema:
1. Verifique o console do navegador (F12)
2. Verifique os logs do terminal onde o servidor está rodando
3. Consulte a documentação em `SEPARACAO_USUARIOS_ADMIN.md`
4. Verifique o banco de dados no painel do Supabase

---

**Status**: 🟢 Pronto para Teste  
**Servidor**: http://localhost:5173/  
**Data**: 2026-01-23
