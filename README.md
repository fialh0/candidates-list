# Listagem de candidates

> Shadcn + TanStack + Tailwind

O projeto consiste em uma listagem de candidates onde podemos adicionar novos candidates e filtrar por `id` ou `nome`.

- Estamos usando `shadcn-ui` para montar os componentes em tela:
  - `button`
  - `dialog`
  - `drawer`
  - `input`
  - `label`
  - `skeleton`
  - `sonner`
  - `table`
- Os estilos da página, como diagramação e espaçamentos estamos usando `tailwindui`.
- Para os formulários de busca e cadastro estamos usando `react-hook-form`, `zod` e `tanstack`. Com isso podemos fazer o controle dos formulários, validações e controle dos dados usando o estado http.
- Os filtros são gerenciados com uma junção entre `react-router-dom` e `tanstack`.
