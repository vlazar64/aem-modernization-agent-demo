/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: static-site cleanup.
 * Removes non-authorable content from vlazar64.github.io/static-site pages.
 * All selectors from captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove mobile menu overlay (blocks interaction with content)
    // Found in captured HTML: <div id="mobile-menu" class="mobile-menu fixed inset-0 z-50 ...">
    WebImporter.DOMUtils.remove(element, ['#mobile-menu']);

    // Remove decorative geometric shapes in hero section
    // Found in captured HTML: <div class="absolute top-20 right-10 w-64 h-64 border border-white/10 rounded-full">
    const heroSection = element.querySelector('section.relative.min-h-screen');
    if (heroSection) {
      const decorativeShapes = heroSection.querySelectorAll(':scope > .absolute:not(.wave-divider):not([class*="z-10"])');
      decorativeShapes.forEach((shape) => {
        // Only remove elements that are purely decorative (empty or contain no text)
        if (!shape.textContent.trim() || shape.classList.contains('hero-overlay')) {
          shape.remove();
        }
      });
    }

    // Remove wave dividers between sections (decorative SVG separators)
    // Found in captured HTML: <div class="wave-divider absolute bottom-0 left-0 w-full">
    WebImporter.DOMUtils.remove(element, ['.wave-divider']);
  }

  if (hookName === H.after) {
    // Remove header navigation (non-authorable, auto-populated)
    // Found in captured HTML: <header id="header" class="fixed top-0 left-0 w-full z-40 ...">
    WebImporter.DOMUtils.remove(element, ['header#header', 'header']);

    // Remove footer (non-authorable, auto-populated)
    // Found in captured HTML: <footer class="bg-gray-900 text-gray-400">
    WebImporter.DOMUtils.remove(element, ['footer']);

    // Remove any remaining iframes, link tags, noscript
    WebImporter.DOMUtils.remove(element, ['iframe', 'link', 'noscript']);
  }
}
