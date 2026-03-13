/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form.
 * Base: form. Source: https://vlazar64.github.io/static-site/index.html
 * Selector: form.contact-form
 * Form block: single column with link to form definition.
 * Extracts form fields and creates a form block referencing a form definition path.
 */
export default function parse(element, { document }) {
  // Create a link to the form definition (to be created separately)
  const formLink = document.createElement('a');
  formLink.href = '/forms/contact';
  formLink.textContent = '/forms/contact';

  const cells = [[formLink]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
