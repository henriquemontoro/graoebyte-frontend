# Grão & Byte — Frontend

Interface web para o sistema de gestão interna da cafeteria Grão & Byte.

## Tecnologias
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- Google Fonts (Poppins)

## Como rodar

### Pré-requisitos
- Node.js instalado
- Backend rodando em localhost:3001

### Instalação
```bash
cd aula-front
npm install
```

### Rodar em desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:5173

## Funcionalidades

### Acesso
- Login com email e senha
- Botão de mostrar/ocultar senha
- Rotas protegidas por JWT
- Dois níveis de acesso: Admin e Funcionário
- Logout limpa sessão e modo de visualização

### Produtos
- Listagem em cards ou tabela
- Métricas: total, disponíveis, indisponíveis, preço médio
- Busca por nome ou descrição
- Filtro por categoria
- Filtro por disponibilidade
- Ordenação clicável por preço na tabela
- Ordenação padrão por categoria e nome alfabético
- Cores por categoria nos cards e badges
- Marcar produto como disponível/indisponível
- Criar, editar e deletar produtos
- Validação de campos obrigatórios
- Modal de confirmação ao deletar

### Usuários (Admin)
- Listar, criar e deletar usuários
- Alterar role (admin/funcionário)
- Proteção contra remoção do único admin
- Validação de senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 símbolo
- Modal de confirmação ao deletar
- Botão de mostrar/ocultar senha

### Histórico (Admin)
- Registro de todas as ações no sistema
- Data e hora em horário de Brasília
- Limpar histórico com modal de confirmação

### Modo Funcionário (Admin)
- Admin pode visualizar o sistema como funcionário
- Oculta abas restritas (Usuários, Histórico)
- Persiste entre páginas via localStorage
- Limpo automaticamente ao fazer logout
