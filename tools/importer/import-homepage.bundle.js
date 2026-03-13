var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/cards-service.js
  function parse(element, { document: document2 }) {
    const container = element.closest(".grid") || element.parentElement;
    const cards = container ? Array.from(container.querySelectorAll(".service-card")) : [element];
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector(".w-14 img, .w-12 img, img");
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");
      const link = card.querySelector("a");
      const contentCell = [];
      if (title) contentCell.push(title);
      if (desc) contentCell.push(desc);
      if (link) contentCell.push(link);
      cells.push([icon || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-service", cells });
    element.replaceWith(block);
    cards.forEach((card) => {
      if (card.parentElement) card.remove();
    });
  }

  // tools/importer/parsers/columns-differentiator.js
  function parse2(element, { document: document2 }) {
    const container = element.closest(".grid") || element.parentElement;
    const items = container ? Array.from(container.querySelectorAll(":scope > .flex.gap-4, :scope > div > .flex.gap-4")) : [element];
    const allItems = items.length > 0 ? items : [element];
    const cells = [];
    for (let i = 0; i < allItems.length; i += 3) {
      const row = [];
      for (let j = i; j < Math.min(i + 3, allItems.length); j++) {
        const item = allItems[j];
        const icon = item.querySelector("img");
        const title = item.querySelector("h3");
        const desc = item.querySelector("p");
        const cell = document2.createElement("div");
        if (icon) cell.append(icon);
        if (title) cell.append(title);
        if (desc) cell.append(desc);
        row.push(cell);
      }
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-differentiator", cells });
    element.replaceWith(block);
    allItems.forEach((item) => {
      if (item.parentElement) item.remove();
    });
  }

  // tools/importer/parsers/columns-testimonial.js
  function parse3(element, { document: document2 }) {
    const container = element.closest(".grid") || element.parentElement;
    const testimonials = container ? Array.from(container.querySelectorAll(".bg-white.rounded-2xl.shadow-xl")) : [element];
    const row = [];
    testimonials.forEach((card) => {
      const quoteText = card.querySelector("p.text-gray-700, p.leading-relaxed");
      const authorDiv = card.querySelector(".border-t, div:last-child");
      const authorName = authorDiv ? authorDiv.querySelector("p.font-bold, p:first-child") : null;
      const authorCompany = authorDiv ? authorDiv.querySelector("p.text-gray-500, p.text-sm, p:last-child") : null;
      const cell = document2.createElement("div");
      if (quoteText) cell.append(quoteText);
      if (authorName) cell.append(authorName);
      if (authorCompany && authorCompany !== authorName) cell.append(authorCompany);
      row.push(cell);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-testimonial", cells });
    element.replaceWith(block);
    testimonials.forEach((card) => {
      if (card.parentElement) card.remove();
    });
  }

  // tools/importer/parsers/columns-award.js
  function parse4(element, { document: document2 }) {
    const container = element.closest(".grid") || element.parentElement;
    const awards = container ? Array.from(container.querySelectorAll(".text-center.p-8")) : [element];
    const row = [];
    awards.forEach((item) => {
      const icon = item.querySelector("img");
      const title = item.querySelector("h3");
      const subtitle = item.querySelector("p.text-gray-500, p.text-sm, p");
      const cell = document2.createElement("div");
      if (icon) cell.append(icon);
      if (title) cell.append(title);
      if (subtitle) cell.append(subtitle);
      row.push(cell);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-award", cells });
    element.replaceWith(block);
    awards.forEach((item) => {
      if (item.parentElement) item.remove();
    });
  }

  // tools/importer/parsers/cards-blog.js
  function parse5(element, { document: document2 }) {
    const container = element.closest(".grid") || element.parentElement;
    const articles = container ? Array.from(container.querySelectorAll("article.bg-white")) : [element];
    const cells = [];
    articles.forEach((article) => {
      const dateBadge = article.querySelector("span");
      const dateText = dateBadge ? dateBadge.textContent.trim() : "";
      const dateEl = document2.createElement("p");
      dateEl.textContent = dateText;
      const title = article.querySelector("h3");
      const desc = article.querySelector(".p-6 p, p.text-gray-600");
      const link = article.querySelector("a");
      const contentCell = [];
      if (title) contentCell.push(title);
      if (desc) contentCell.push(desc);
      if (link) contentCell.push(link);
      cells.push([dateEl, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-blog", cells });
    element.replaceWith(block);
    articles.forEach((article) => {
      if (article.parentElement) article.remove();
    });
  }

  // tools/importer/parsers/form.js
  function parse6(element, { document: document2 }) {
    const formLink = document2.createElement("a");
    formLink.href = "/forms/contact";
    formLink.textContent = "/forms/contact";
    const cells = [[formLink]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/static-site-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["#mobile-menu"]);
      const heroSection = element.querySelector("section.relative.min-h-screen");
      if (heroSection) {
        const decorativeShapes = heroSection.querySelectorAll(':scope > .absolute:not(.wave-divider):not([class*="z-10"])');
        decorativeShapes.forEach((shape) => {
          if (!shape.textContent.trim() || shape.classList.contains("hero-overlay")) {
            shape.remove();
          }
        });
      }
      WebImporter.DOMUtils.remove(element, [".wave-divider"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, ["header#header", "header"]);
      WebImporter.DOMUtils.remove(element, ["footer"]);
      WebImporter.DOMUtils.remove(element, ["iframe", "link", "noscript"]);
    }
  }

  // tools/importer/transformers/static-site-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const doc = element.ownerDocument || document;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          } catch (e) {
          }
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "cards-service": parse,
    "columns-differentiator": parse2,
    "columns-testimonial": parse3,
    "columns-award": parse4,
    "cards-blog": parse5,
    "form": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Marketing homepage with hero banner, service cards, value propositions, client testimonials, awards, blog previews, and contact form",
    urls: [
      "https://vlazar64.github.io/static-site/index.html"
    ],
    sections: [
      {
        id: "hero",
        name: "Hero Section",
        selector: "section.relative.min-h-screen",
        style: "dark",
        blocks: [],
        defaultContent: [".relative.z-10 h1", ".relative.z-10 p", ".relative.z-10 .flex.flex-wrap a"]
      },
      {
        id: "digital-solutions",
        name: "Digital Solutions Section",
        selector: "section.py-20.bg-white",
        style: null,
        blocks: ["cards-service"],
        defaultContent: [".text-center.mb-16 h2"]
      },
      {
        id: "differentiators",
        name: "Why Choose YourBrand Section",
        selector: "section.py-20.bg-gray-50",
        style: "light",
        blocks: ["columns-differentiator"],
        defaultContent: [".text-center.mb-16 h2"]
      },
      {
        id: "client-logos",
        name: "Trusted By Industry Leaders Section",
        selector: "section.py-16.bg-white",
        style: null,
        blocks: [],
        defaultContent: [".text-center.mb-12 h2", ".flex.flex-wrap span"]
      },
      {
        id: "testimonials",
        name: "What Our Clients Say Section",
        selector: "section.relative.py-20.overflow-hidden",
        style: "dark",
        blocks: ["columns-testimonial"],
        defaultContent: [".text-center.mb-16 h2"]
      },
      {
        id: "awards",
        name: "Awards & Recognition Section",
        selector: ["section.py-20.bg-white:nth-of-type(4)", "section.py-20.bg-white + section.py-20.bg-white + section.py-20.bg-white"],
        style: null,
        blocks: ["columns-award"],
        defaultContent: [".text-center.mb-16 h2"]
      },
      {
        id: "blog-preview",
        name: "Latest Insights Section",
        selector: ["section.py-20.bg-gray-50:nth-of-type(2)", "section.py-20.bg-gray-50 + section + section + section + section.py-20.bg-gray-50"],
        style: "light",
        blocks: ["cards-blog"],
        defaultContent: [".text-center.mb-16 h2", ".text-center.mt-12 a"]
      },
      {
        id: "contact",
        name: "Contact Section",
        selector: "section#contact",
        style: "dark",
        blocks: ["form"],
        defaultContent: [".text-center.mb-16 h2", ".text-center.mb-16 p", ".flex.flex-col.justify-center"]
      }
    ],
    blocks: [
      {
        name: "cards-service",
        instances: [".service-card"]
      },
      {
        name: "columns-differentiator",
        instances: ["section.py-20.bg-gray-50 .grid .flex.gap-4"]
      },
      {
        name: "columns-testimonial",
        instances: ["section.relative.py-20.overflow-hidden .bg-white.rounded-2xl.shadow-xl"]
      },
      {
        name: "columns-award",
        instances: [".grid.max-w-4xl .text-center.p-8"]
      },
      {
        name: "cards-blog",
        instances: ["section.py-20.bg-gray-50 article.bg-white.rounded-2xl"]
      },
      {
        name: "form",
        instances: ["form.contact-form"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        try {
          const elements = document2.querySelectorAll(selector);
          if (elements.length === 0) {
            console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
          }
          elements.forEach((element) => {
            pageBlocks.push({
              name: blockDef.name,
              selector,
              element,
              section: blockDef.section || null
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
