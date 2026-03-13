/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import cardsServiceParser from './parsers/cards-service.js';
import columnsDifferentiatorParser from './parsers/columns-differentiator.js';
import columnsTestimonialParser from './parsers/columns-testimonial.js';
import columnsAwardParser from './parsers/columns-award.js';
import cardsBlogParser from './parsers/cards-blog.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/static-site-cleanup.js';
import sectionsTransformer from './transformers/static-site-sections.js';

// PARSER REGISTRY
const parsers = {
  'cards-service': cardsServiceParser,
  'columns-differentiator': columnsDifferentiatorParser,
  'columns-testimonial': columnsTestimonialParser,
  'columns-award': columnsAwardParser,
  'cards-blog': cardsBlogParser,
  'form': formParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Marketing homepage with hero banner, service cards, value propositions, client testimonials, awards, blog previews, and contact form',
  urls: [
    'https://vlazar64.github.io/static-site/index.html',
  ],
  sections: [
    {
      id: 'hero',
      name: 'Hero Section',
      selector: 'section.relative.min-h-screen',
      style: 'dark',
      blocks: [],
      defaultContent: ['.relative.z-10 h1', '.relative.z-10 p', '.relative.z-10 .flex.flex-wrap a'],
    },
    {
      id: 'digital-solutions',
      name: 'Digital Solutions Section',
      selector: 'section.py-20.bg-white',
      style: null,
      blocks: ['cards-service'],
      defaultContent: ['.text-center.mb-16 h2'],
    },
    {
      id: 'differentiators',
      name: 'Why Choose YourBrand Section',
      selector: 'section.py-20.bg-gray-50',
      style: 'light',
      blocks: ['columns-differentiator'],
      defaultContent: ['.text-center.mb-16 h2'],
    },
    {
      id: 'client-logos',
      name: 'Trusted By Industry Leaders Section',
      selector: 'section.py-16.bg-white',
      style: null,
      blocks: [],
      defaultContent: ['.text-center.mb-12 h2', '.flex.flex-wrap span'],
    },
    {
      id: 'testimonials',
      name: 'What Our Clients Say Section',
      selector: 'section.relative.py-20.overflow-hidden',
      style: 'dark',
      blocks: ['columns-testimonial'],
      defaultContent: ['.text-center.mb-16 h2'],
    },
    {
      id: 'awards',
      name: 'Awards & Recognition Section',
      selector: ['section.py-20.bg-white:nth-of-type(4)', 'section.py-20.bg-white + section.py-20.bg-white + section.py-20.bg-white'],
      style: null,
      blocks: ['columns-award'],
      defaultContent: ['.text-center.mb-16 h2'],
    },
    {
      id: 'blog-preview',
      name: 'Latest Insights Section',
      selector: ['section.py-20.bg-gray-50:nth-of-type(2)', 'section.py-20.bg-gray-50 + section + section + section + section.py-20.bg-gray-50'],
      style: 'light',
      blocks: ['cards-blog'],
      defaultContent: ['.text-center.mb-16 h2', '.text-center.mt-12 a'],
    },
    {
      id: 'contact',
      name: 'Contact Section',
      selector: 'section#contact',
      style: 'dark',
      blocks: ['form'],
      defaultContent: ['.text-center.mb-16 h2', '.text-center.mb-16 p', '.flex.flex-col.justify-center'],
    },
  ],
  blocks: [
    {
      name: 'cards-service',
      instances: ['.service-card'],
    },
    {
      name: 'columns-differentiator',
      instances: ['section.py-20.bg-gray-50 .grid .flex.gap-4'],
    },
    {
      name: 'columns-testimonial',
      instances: ['section.relative.py-20.overflow-hidden .bg-white.rounded-2xl.shadow-xl'],
    },
    {
      name: 'columns-award',
      instances: ['.grid.max-w-4xl .text-center.p-8'],
    },
    {
      name: 'cards-blog',
      instances: ['section.py-20.bg-gray-50 article.bg-white.rounded-2xl'],
    },
    {
      name: 'form',
      instances: ['form.contact-form'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`, e);
      }
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
