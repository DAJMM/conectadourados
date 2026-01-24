# 🎯 Guia Rápido de Teste - Filtro de Categorias

## ✅ Checklist de Teste

### 1️⃣ Verificar o Dropdown no Header
- [ ] Abrir http://localhost:5173/
- [ ] Localizar o botão "Categorias" no header (entre "Início" e "Profissionais")
- [ ] Verificar se o botão tem um ícone de filtro

### 2️⃣ Testar Abertura do Dropdown
- [ ] Clicar no botão "Categorias"
- [ ] Verificar se abre um menu dropdown
- [ ] Confirmar que mostra todos os grupos de categorias:
  - Reformas e Reparos
  - Serviços Domésticos
  - Saúde e Bem-Estar
  - Educação e Aulas
  - Tecnologia e Digital
  - Eventos e Outros

### 3️⃣ Testar Filtragem
- [ ] Selecionar "Diarista / Faxineira" (ou qualquer categoria)
- [ ] Verificar se o dropdown fecha automaticamente
- [ ] Confirmar que o botão "Categorias" fica azul
- [ ] Verificar se aparece "Filtro: Diarista / Faxineira" ao lado de "Profissionais em Destaque"
- [ ] Confirmar que a lista mostra apenas profissionais dessa categoria

### 4️⃣ Testar Limpeza do Filtro
**Opção 1: Botão X**
- [ ] Clicar no "X" no botão de categorias (azul)
- [ ] Verificar se volta a mostrar todos os profissionais
- [ ] Confirmar que o botão volta a ficar cinza

**Opção 2: Limpar Filtro**
- [ ] Abrir o dropdown novamente
- [ ] Clicar em "Limpar filtro" (link no topo do dropdown)
- [ ] Verificar se limpa o filtro

### 5️⃣ Testar Múltiplas Categorias
- [ ] Selecionar "Eletricista"
- [ ] Verificar resultados
- [ ] Selecionar "Personal Trainer"
- [ ] Verificar que os resultados mudaram
- [ ] Limpar filtro

### 6️⃣ Testar Navegação
- [ ] Selecionar uma categoria
- [ ] Navegar para "Sobre Nós"
- [ ] Voltar para "Início"
- [ ] Verificar se o filtro ainda está ativo (deve estar)

### 7️⃣ Testar Responsividade (Opcional)
- [ ] Redimensionar a janela do navegador
- [ ] Verificar se o dropdown se adapta
- [ ] Testar em modo mobile (F12 > Toggle device toolbar)

## 🐛 Possíveis Problemas e Soluções

### Problema: Dropdown não abre
**Solução:** Verificar console do navegador (F12) para erros

### Problema: Filtro não funciona
**Solução:** 
1. Verificar se há anúncios cadastrados no banco
2. Verificar se as categorias dos anúncios correspondem exatamente às do dropdown
3. Abrir console e verificar a query do Supabase

### Problema: Botão não aparece no header
**Solução:** 
1. Limpar cache do navegador (Ctrl+Shift+R)
2. Verificar se está na versão desktop (não mobile)

## 📸 O Que Você Deve Ver

### Estado Inicial (Sem Filtro)
```
Header: [Logo] Início [Categorias (cinza)] Profissionais Sobre Nós [Área do Anunciante]
Profissionais em Destaque
[6 profissionais mais recentes]
```

### Com Filtro Ativo
```
Header: [Logo] Início [Categorias: Diarista / Faxineira (azul) X] Profissionais Sobre Nós
Profissionais em Destaque [Filtro: Diarista / Faxineira]
[Todos os profissionais dessa categoria]
```

### Dropdown Aberto
```
┌─────────────────────────────────────┐
│ Filtrar por Categoria  Limpar filtro│
├─────────────────────────────────────┤
│ REFORMAS E REPAROS                  │
│ ○ Eletricista                       │
│ ○ Encanador (Bombeiro Hidráulico)   │
│ ○ Pintor Residencial/Comercial      │
│ ...                                 │
├─────────────────────────────────────┤
│ SERVIÇOS DOMÉSTICOS                 │
│ ○ Diarista / Faxineira              │
│ ○ Passadeira                        │
│ ...                                 │
└─────────────────────────────────────┘
```

## 🎨 Cores e Estilos

- **Botão sem filtro:** Fundo cinza claro, texto cinza escuro
- **Botão com filtro:** Fundo azul (primary), texto branco, ícone X
- **Dropdown:** Fundo branco, sombra, bordas arredondadas
- **Categoria selecionada:** Fundo azul, texto branco
- **Categoria hover:** Fundo cinza claro
- **Badge de filtro:** Fundo azul claro, texto azul, borda azul

## ✅ Critérios de Sucesso

A implementação está funcionando corretamente se:
1. ✓ Dropdown aparece no header ao lado de "Início"
2. ✓ Todas as 42 categorias estão listadas
3. ✓ Ao selecionar uma categoria, a lista filtra
4. ✓ Badge visual mostra qual filtro está ativo
5. ✓ Botão X limpa o filtro
6. ✓ Sem filtro, mostra 6 profissionais mais recentes
7. ✓ Com filtro, mostra todos da categoria selecionada

## 🚀 Teste Agora!

Abra o navegador e acesse: **http://localhost:5173/**

O servidor já está rodando! ✅
