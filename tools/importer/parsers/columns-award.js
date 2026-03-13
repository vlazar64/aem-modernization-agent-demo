/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-award.
 * Base: columns. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: .grid.max-w-4xl .text-center.p-8
 * Columns block: 3 columns, 1 row. Each cell: icon + title + subtitle.
 */
export default function parse(element, { document }) {
  // Find parent grid container holding all award items
  const container = element.closest('.grid') || element.parentElement;
  const awards = container
    ? Array.from(container.querySelectorAll('.text-center.p-8'))
    : [element];

  // Build a single row with each award as a column
  const row = [];
  awards.forEach((item) => {
    // Icon image (inside wrapper div with bg-blue-50)
    const icon = item.querySelector('img');
    // Title (h3)
    const title = item.querySelector('h3');
    // Subtitle (p.text-gray-500 or p.text-sm)
    const subtitle = item.querySelector('p.text-gray-500, p.text-sm, p');

    const cell = document.createElement('div');
    if (icon) cell.append(icon);
    if (title) cell.append(title);
    if (subtitle) cell.append(subtitle);
    row.push(cell);
  });

  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-award', cells });
  element.replaceWith(block);

  // Remove remaining award elements
  awards.forEach((item) => {
    if (item.parentElement) item.remove();
  });
}
