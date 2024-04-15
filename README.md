#  Gerenciador de Pessoas PWA

Aplicativo PWA completo para cadastro, listagem e exclusão de pessoas em um banco de dados local (IndexedDB). O aplicativo foi desenvolvido utilizando as seguintes tecnologias:

## Acesse o aplicativo [aqui](https://pwa-idb.vercel.app/).

## Funcionalidades:

- Cadastrar novas pessoas informando nome e idade.
- Listar todas as pessoas cadastradas.
- Excluir pessoas individualmente da lista.
- Atualizar a idade de pessoas cadastradas.
- Funcionamento offline.

## Visão Geral:

O aplicativo é composto por um documento HTML principal e um service worker separado. O código JavaScript principal utiliza IndexedDB para persistir os dados das pessoas cadastradas. O service worker, configurado com Workbox, implementa estratégias de cache para garantir a funcionalidade offline do aplicativo.

## Tecnologias Utilizadas:


- HTML: Define a estrutura da página web.
- CSS: Estiliza a interface do usuário.
- JavaScript: Gerencia a interação do usuário, manipula o IndexedDB e interage com o service worker.
- Vite: Ferramenta de build para módulos JavaScript modernos.
- IndexedDB API: API nativa do navegador para armazenar dados localmente de forma estruturada.

### Service Worker:

- Workbox: Biblioteca que simplifica a implementação de estratégias de cache para service workers.

## Estrutura do Código:

O código principal está dividido em vários arquivos JavaScript:

- `idb.js`: Contém as funções para interagir com o IndexedDB, incluindo criação do banco de dados, adição, listagem, exclusão e atualização de registros.
- `app.js`: Ponto de entrada da aplicação. Inicializa o IndexedDB, configura os eventos de click nos botões e chama as funções de adição e listagem de dados.

## Service Worker (`sw.js`):

O service worker utiliza Workbox para definir estratégias de cache para diferentes tipos de recursos:

- Cache First para páginas: O service worker tentará buscar a página do cache primeiro. Se a página não estiver disponível no cache, ele buscará do servidor.
- Stale While Revalidate para assets: O service worker buscará os assets (CSS, JavaScript) do cache primeiro. Se o asset não estiver no cache ou estiver obsoleto, ele buscará a atualização do servidor.
- Cache First para imagens: O service worker tentará buscar as imagens do cache primeiro. Se a imagem não estiver disponível no cache, ele buscará do servidor. As imagens são armazenadas em cache por um longo período (30 dias).
- Offline Fallback: Se o usuário estiver offline e tentar acessar uma página que não está em cache, o service worker exibirá uma página offline (`offline.html`).

## Contribuindo:

Sinta-se à vontade para contribuir para este projeto! Fork o repositório, faça suas alterações e envie uma solicitação pull.


