/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-service.
 * Base: cards. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: .service-card
 * Cards block: 2 columns per row. Col 1: icon/image. Col 2: title + description + CTA.
 */
export default function parse(element, { document }) {
  // Find parent grid container holding all service cards
  const container = element.closest('.grid') || element.parentElement;
  const cards = container
    ? Array.from(container.querySelectorAll('.service-card'))
    : [element];

  const cells = [];
  cards.forEach((card) => {
    // Col 1: icon image (inside wrapper div with bg-blue-50)
    const icon = card.querySelector('.w-14 img, .w-12 img, img');
    // Col 2: title (h3) + description (p) + CTA link (a)
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const link = card.querySelector('a');

    const contentCell = [];
    if (title) contentCell.push(title);
    if (desc) contentCell.push(desc);
    if (link) contentCell.push(link);

    cells.push([icon || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-service', cells });
  element.replaceWith(block);

  // Remove remaining card elements that were processed
  cards.forEach((card) => {
    if (card.parentElement) card.remove();
  });
}
