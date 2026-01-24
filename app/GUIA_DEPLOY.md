# 🚀 GUIA RÁPIDO - Deploy e Manutenção

## 📦 Deploy para Produção

### Comando Rápido
```bash
cd "d:\Canecta Dourados 19-01-26\Conecta Dourados\conectadourados\app"
vercel --prod
```

### Passo a Passo Completo
```bash
# 1. Navegar para o diretório
cd "d:\Canecta Dourados 19-01-26\Conecta Dourados\conectadourados\app"

# 2. Fazer build local (opcional, para testar)
npm run build

# 3. Fazer deploy para produção
vercel --prod

# 4. Aguardar conclusão do deploy
# O Vercel mostrará a URL quando concluir
```

---

## 🔄 Workflow de Desenvolvimento

### 1. Desenvolvimento Local
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar em: http://localhost:5173/
```

### 2. Testar Build
```bash
# Fazer build de produção
npm run build

# Testar build localmente
npm run preview

# Acessar em: http://localhost:4173/
```

### 3. Deploy
```bash
# Deploy para produção
vercel --prod

# Ou deploy para preview (staging)
vercel
```

---

## 🌐 URLs do Projeto

### Produção
- **Site**: https://www.conectadourados.com.br
- **Admin**: https://www.conectadourados.com.br/admin
- **Área do Cliente**: https://www.conectadourados.com.br/area-do-cliente

### Desenvolvimento
- **Local**: http://localhost:5173/
- **Preview Build**: http://localhost:4173/

### Vercel
- **Dashboard**: https://vercel.com/diego-moreiras-projects-b8418fba/conectadourados

---

## 🔧 Gerenciar Variáveis de Ambiente

### Ver Variáveis
```bash
vercel env ls
```

### Adicionar Variável
```bash
vercel env add NOME_DA_VARIAVEL
# Escolher ambiente: production, preview, development
```

### Remover Variável
```bash
vercel env rm NOME_DA_VARIAVEL
```

### Puxar Variáveis para Local
```bash
vercel env pull
```

---

## 📊 Monitoramento

### Ver Logs de Produção
```bash
vercel logs
```

### Ver Deployments
```bash
vercel ls
```

### Inspecionar Deploy Específico
```bash
vercel inspect [deployment-url]
```

---

## 🔄 Rollback (Reverter Deploy)

### Listar Deployments
```bash
vercel ls
```

### Promover Deploy Anterior
```bash
vercel promote [deployment-url]
```

---

## 🗑️ Limpeza

### Remover Deploy Antigo
```bash
vercel rm [deployment-url]
```

### Limpar Cache Local
```bash
# Remover node_modules e reinstalar
rm -rf node_modules
npm install

# Limpar cache do Vite
rm -rf dist
npm run build
```

---

## 🔐 Segurança

### Verificar Variáveis de Ambiente
```bash
# Local
cat .env

# Produção (via Vercel)
vercel env ls
```

### Atualizar Chaves do Supabase
```bash
# 1. Obter novas chaves do Supabase
# 2. Atualizar no Vercel
vercel env rm VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_URL

vercel env rm VITE_SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_ANON_KEY

# 3. Fazer novo deploy
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Falha
```bash
# 1. Verificar erros localmente
npm run build

# 2. Ver logs do Vercel
vercel logs

# 3. Verificar variáveis de ambiente
vercel env ls
```

### Site Não Atualiza
```bash
# 1. Limpar cache do navegador
# Ctrl + Shift + Delete

# 2. Fazer novo deploy forçado
vercel --prod --force

# 3. Verificar se o deploy foi bem-sucedido
vercel ls
```

### Erro 404 em Rotas
```bash
# Verificar se vercel.json está correto
cat vercel.json

# Deve conter:
# {
#   "rewrites": [
#     { "source": "/(.*)", "destination": "/index.html" }
#   ]
# }
```

---

## 📝 Checklist Antes do Deploy

- [ ] Código testado localmente
- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Commits feitos (se usar Git)
- [ ] Changelog atualizado (opcional)
- [ ] Testes passando (se houver)

---

## 🎯 Comandos Úteis do NPM

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Verificar erros de código
```

### Dependências
```bash
npm install          # Instalar dependências
npm update           # Atualizar dependências
npm outdated         # Ver pacotes desatualizados
```

---

## 🔗 Links Rápidos

### Vercel
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- CLI Docs: https://vercel.com/docs/cli

### Supabase
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- API Reference: https://supabase.com/docs/reference

### Projeto
- Site: https://www.conectadourados.com.br
- Vercel: https://vercel.com/diego-moreiras-projects-b8418fba/conectadourados

---

## 💡 Dicas

### Deploy Rápido
```bash
# Criar alias para deploy rápido
# Adicionar ao seu .bashrc ou .zshrc:
alias deploy-conecta="cd 'd:\Canecta Dourados 19-01-26\Conecta Dourados\conectadourados\app' && vercel --prod"

# Usar:
deploy-conecta
```

### Monitoramento Contínuo
```bash
# Ver logs em tempo real
vercel logs --follow
```

### Preview Branches
```bash
# Deploy de preview (não afeta produção)
vercel

# Útil para testar antes de ir para produção
```

---

**Última Atualização**: 2026-01-23  
**Status**: ✅ Produção Online  
**URL**: https://www.conectadourados.com.br
