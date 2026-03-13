/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-differentiator.
 * Base: columns. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: section.py-20.bg-gray-50 .grid .flex.gap-4
 * Columns block: 3 columns per row. Each cell: icon + title + description.
 * Source has 7 items in a 3-col grid layout.
 */
export default function parse(element, { document }) {
  // Find parent grid container holding all differentiator items
  const container = element.closest('.grid') || element.parentElement;
  const items = container
    ? Array.from(container.querySelectorAll(':scope > .flex.gap-4, :scope > div > .flex.gap-4'))
    : [element];

  // If no items found via scoped query, try broader search
  const allItems = items.length > 0 ? items : [element];

  // Group items into rows of 3 (matching source 3-col grid layout)
  const cells = [];
  for (let i = 0; i < allItems.length; i += 3) {
    const row = [];
    for (let j = i; j < Math.min(i + 3, allItems.length); j++) {
      const item = allItems[j];
      // Each item: icon (img in wrapper) + title (h3) + description (p)
      const icon = item.querySelector('img');
      const title = item.querySelector('h3');
      const desc = item.querySelector('p');

      const cell = document.createElement('div');
      if (icon) cell.append(icon);
      if (title) cell.append(title);
      if (desc) cell.append(desc);
      row.push(cell);
    }
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-differentiator', cells });
  element.replaceWith(block);

  // Remove remaining items that were processed
  allItems.forEach((item) => {
    if (item.parentElement) item.remove();
  });
}
