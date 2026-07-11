
# Rick and Morty Universe Explorer

Um aplicativo web para explorar o universo de Rick and Morty, com personagens, episódios e localizações!

## Funcionalidades

- 🧑‍🚀 **Personagens**: Explore todos os personagens da série, com filtro por nome e status (vivo/morto/desconhecido)
- 📺 **Episódios**: Veja todos os episódios, com filtro por temporada
- 🌍 **Localizações**: Descubra todas as localizações do universo, com filtro por tipo
- ❤️ **Favoritos**: Adicione personagens aos favoritos (salvo no localStorage)
- 🌙 **Modo Escuro**: Alternância entre modo claro e escuro

## Tecnologias Usadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wouter](https://github.com/molefrog/wouter) (roteamento)
- [Lucide React](https://lucide.dev/) (ícones)
- [Rick and Morty API](https://rickandmortyapi.com/)

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- [pnpm](https://pnpm.io/) (ou npm/yarn)

### Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/marcosads2025/Rick-and-Morty-app-.git
   cd Rick-and-Morty-app-
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
   O app abrirá automaticamente no navegador em http://localhost:3000/

### Build para Produção

Para criar uma versão otimizada para produção:
```bash
pnpm build
```

Para rodar a versão de produção:
```bash
pnpm start
```

## Estrutura do Projeto

```
rick-and-morty-app/
├── client/             # Código do frontend React
│   ├── public/         # Arquivos públicos
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   │   ├── ui/     # Componentes UI (shadcn/ui)
│   │   ├── contexts/   # Contextos React (Favoritos, Tema)
│   │   ├── hooks/      # Hooks customizados
│   │   ├── lib/        # Utilitários
│   │   ├── pages/      # Páginas do app
│   │   ├── App.tsx     # Componente principal
│   │   └── main.tsx    # Entry point
├── server/             # Servidor Express (opcional)
├── shared/             # Código compartilhado
├── patches/            # Patches para dependências
└── package.json        # Dependências e scripts
```

## Como Funciona

O app consome a [API pública do Rick and Morty](https://rickandmortyapi.com/) para buscar dados de personagens, episódios e localizações.

- **Favoritos**: Os personagens favoritos são salvos no localStorage do navegador
- **Tema**: O tema (claro/escuro) também é salvo no localStorage
- **Roteamento**: Usamos o Wouter para navegação entre as páginas

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Cria o build de produção
- `pnpm start`: Inicia o servidor de produção
- `pnpm check`: Verifica tipos TypeScript
- `pnpm format`: Formata o código com Prettier

## Licença

MIT
