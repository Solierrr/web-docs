import { readFile, writeFile, mkdir } from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const html = await readFile(new URL('dist/index.html', root), 'utf8');
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const renderItem = item => `<li>${escape(item)}</li>`;
const renderList = block => {
  const tag = block.ordered ? 'ol' : 'ul';
  return `<${tag}>` + block.items.map(renderItem).join('') + `</${tag}>`;
};
const renderBlock = block => {
  switch (block.type) {
    case 'paragraph': case 'note': return `<p>${escape(block.text)}</p>`;
    case 'heading': return `<h3>${escape(block.text)}</h3>`;
    case 'list': return renderList(block);
    case 'link': return `<p><a href="${escape(block.href)}">${escape(block.text)}</a></p>`;
    default: return '';
  }
};
const renderSection = section => {
  const body = section.blocks.map(renderBlock).join('');
  return `<section id="${escape(section.id)}"><h2>${escape(section.title)}</h2>` + body + '</section>';
};
for (const id of ['privacy','terms','cookies','google-calendar']) {
  const doc = JSON.parse(await readFile(new URL(`src/content/${id}/pt-BR.json`,root),'utf8'));
  const content = `<main><nav><a href="/">Início</a></nav><h1>${escape(doc.title)}</h1><p>${escape(doc.description)}</p>${doc.sections.map(renderSection).join('')}</main>`;
  const page=html.replace('<title>Solaria Docs</title>',`<title>${escape(doc.title)} | Solaria Docs</title>`).replace('content="Documentação pública do Solaria."',`content="${escape(doc.description)}"`).replace('<div id="root"></div>',`<div id="root">${content}</div>`);
  const dir=new URL(`dist/documentos/${id}/`,root); await mkdir(dir,{recursive:true}); await writeFile(new URL('index.html',dir),page);
}
const home='<main><h1>Solaria Docs</h1><p>O Solaria reúne produtos, profissionais e empresas para apoiar projetos de energia solar.</p><nav aria-label="Documentos"><a href="/documentos/privacy/">Política de privacidade</a> · <a href="/documentos/terms/">Termos de uso</a> · <a href="/documentos/cookies/">Política de cookies</a> · <a href="/documentos/google-calendar/">Google Calendar</a></nav><p>Contato: <a href="mailto:solaria.innetwork@gmail.com">solaria.innetwork@gmail.com</a></p></main>';
await writeFile(new URL('dist/index.html',root),html.replace('<div id="root"></div>',`<div id="root">${home}</div>`));
await writeFile(new URL('dist/404.html',root),'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Página não encontrada | Solaria Docs</title><main><h1>Página não encontrada</h1><a href="/">Voltar ao início</a></main></html>');

