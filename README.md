# Grão & Byte — Frontend

Interface web para o sistema de gestão interna da cafeteria Grão & Byte.

## Tecnologias
- React + TypeScript
- Vite
- Tailwind CSS
- Styled Components
- Axios

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
- Rotas protegidas por JWT
- Dois níveis de acesso: Admin e Funcionário

### Produtos
- Listagem em cards ou tabela
- Métricas: total, disponíveis, indisponíveis, preço médio
- Busca por nome ou descrição
- Filtro por categoria
- Ordenação por categoria e nome
- Marcar produto como disponível/indisponível
- Criar, editar e deletar produtos
- Validação de campos obrigatórios

### Usuários (Admin)
- Listar, criar e deletar usuários
- Alterar role (admin/funcionário)
- Proteção contra remoção do último admin
- Visualizar sistema como funcionário

### Histórico (Admin)
- Registro de todas as ações no sistema
- Data e hora em horário de Brasília
- Limpar histórico
