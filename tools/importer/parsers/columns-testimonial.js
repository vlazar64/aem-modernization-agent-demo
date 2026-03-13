/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-testimonial.
 * Base: columns. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: section.relative.py-20.overflow-hidden .bg-white.rounded-2xl.shadow-xl
 * Columns block: 2 columns, 1 row. Each cell: quote text + author name + company.
 */
export default function parse(element, { document }) {
  // Find parent grid container holding all testimonial cards
  const container = element.closest('.grid') || element.parentElement;
  const testimonials = container
    ? Array.from(container.querySelectorAll('.bg-white.rounded-2xl.shadow-xl'))
    : [element];

  // Build a single row with each testimonial as a column
  const row = [];
  testimonials.forEach((card) => {
    // Skip decorative quote icon image
    // Extract quote text (p with testimonial content, not author info)
    const quoteText = card.querySelector('p.text-gray-700, p.leading-relaxed');
    // Extract author info from bordered div
    const authorDiv = card.querySelector('.border-t, div:last-child');
    const authorName = authorDiv ? authorDiv.querySelector('p.font-bold, p:first-child') : null;
    const authorCompany = authorDiv ? authorDiv.querySelector('p.text-gray-500, p.text-sm, p:last-child') : null;

    const cell = document.createElement('div');
    if (quoteText) cell.append(quoteText);
    if (authorName) cell.append(authorName);
    if (authorCompany && authorCompany !== authorName) cell.append(authorCompany);
    row.push(cell);
  });

  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-testimonial', cells });
  element.replaceWith(block);

  // Remove remaining testimonial elements
  testimonials.forEach((card) => {
    if (card.parentElement) card.remove();
  });
}
