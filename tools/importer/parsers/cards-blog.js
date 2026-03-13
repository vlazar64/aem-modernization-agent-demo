/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-blog.
 * Base: cards. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: section.py-20.bg-gray-50 article.bg-white.rounded-2xl
 * Cards block: 2 columns per row. Col 1: date badge (no source images). Col 2: title + description + CTA.
 */
export default function parse(element, { document }) {
  // Find parent grid container holding all blog cards
  const container = element.closest('.grid') || element.parentElement;
  const articles = container
    ? Array.from(container.querySelectorAll('article.bg-white'))
    : [element];

  const cells = [];
  articles.forEach((article) => {
    // Col 1: date badge from the card header area
    const dateBadge = article.querySelector('span');
    const dateText = dateBadge ? dateBadge.textContent.trim() : '';
    const dateEl = document.createElement('p');
    dateEl.textContent = dateText;

    // Col 2: title (h3) + description (p) + CTA link (a)
    const title = article.querySelector('h3');
    const desc = article.querySelector('.p-6 p, p.text-gray-600');
    const link = article.querySelector('a');

    const contentCell = [];
    if (title) contentCell.push(title);
    if (desc) contentCell.push(desc);
    if (link) contentCell.push(link);

    cells.push([dateEl, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-blog', cells });
  element.replaceWith(block);

  // Remove remaining article elements
  articles.forEach((article) => {
    if (article.parentElement) article.remove();
  });
}
