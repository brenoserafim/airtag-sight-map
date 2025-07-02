# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/246572b7-16b4-4aa5-8d20-68d96cfccb6d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/246572b7-16b4-4aa5-8d20-68d96cfccb6d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/246572b7-16b4-4aa5-8d20-68d96cfccb6d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Como executar o projeto localmente

1. Instale as dependências do Node:

```sh
npm install
```

2. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Abra `http://localhost:8080` no navegador (ou a porta exibida no console) para visualizar a aplicação.

### Token do Mapbox

Ao abrir o dashboard pela primeira vez será solicitado um **Mapbox Access Token**. Para obter o token:

1. Crie uma conta gratuita em [mapbox.com](https://mapbox.com).
2. Copie o token público e cole no campo exibido na aplicação.

O mapa será inicializado após a configuração do token.

### Dados de exemplo e backend

Atualmente os dados exibidos são gerados pelo arquivo `src/services/mockData.ts`. Visite a página **API Setup** dentro da aplicação para ver instruções de integração com um backend real.

## Compilação para produção

Para gerar arquivos estáticos otimizados, execute:

```sh
npm run build
```

Os arquivos prontos ficarão na pasta `dist/`. Você pode pré-visualizar o resultado rodando `npm run preview`.
