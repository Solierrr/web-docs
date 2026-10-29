# Solaria Docs

Portal público de documentação do Solaria, desenvolvido com React, Vite e @solaria.network/web-lib. Os documentos são JSON em `src/content/<documento>/<idioma>.json`, organizados por `src/content/manifest.json`, e os links do rodapé ficam em `src/content/footer.json`. A interface e os documentos estão disponíveis em português (pt-BR), inglês (en-US) e espanhol (es-ES). O idioma vem do cookie `solaria_language` ou do navegador, com pt-BR como padrão; os textos da interface ficam em `src/config/i18n/locales/<idioma>/docs.json`.

## Desenvolvimento

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run check
```

O build gera páginas HTML para as rotas conhecidas e uma página 404. O Worker usa Cloudflare Workers Static Assets e domínio próprio, sem dependência do cluster. Para publicação, autentique o Wrangler e execute `npm run deploy`; é necessário ter acesso à zona Cloudflare do domínio.

Os documentos legais e de integração contêm avisos de conteúdo pendente: não são políticas aprovadas nem documentação suficiente para verificação OAuth. PDFs podem ser colocados manualmente em `pdfs/` junto ao documento, mas download ainda não foi implementado. As traduções em inglês e espanhol são rascunhos e precisam de revisão antes da publicação.

A dependência web-lib é consumida diretamente pelo tarball em vendor/, gerado do pacote 0.5.0 com correção local no Canvas para não apagar o desenho em notificações de resize sem mudança de tamanho. A correção vive no repositório web-lib; após publicação, substituir o tarball pela versão corrigida do npm. O grid branco usa o Canvas original com composição CSS, sem outra implementação do pattern.
