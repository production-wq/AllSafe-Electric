import re

with open('app/[serviceSlug]/page.tsx', 'r') as f:
    content = f.read()

old_toc = """  /* In-page navigation. StickyTOC drops any id that is not in the DOM, so
   * sections that only render for some services never leave a dead anchor. */
  const tocItems = [
    { id: 'signs-heading', label: 'Signs you need this' },
    { id: 'price-heading', label: 'What it costs' },
    { id: 'included-heading', label: "What's included" },
    { id: 'not-included-heading', label: "What isn't covered" },
    { id: 'gallery-heading', label: 'Our work' },
    { id: 'process-heading', label: 'How the job goes' },
    { id: 'permits-heading', label: 'Permits and inspection' },
    { id: 'faq-heading', label: 'Common questions' },
    { id: 'areas-heading', label: 'Areas we cover' },
    { id: 'related-heading', label: 'Related work' },
  ];"""

new_toc = """  const tocItems = [
    ...(s.signs?.length ? [{ id: 'signs-heading', label: 'Signs you need this' }] : []),
    { id: 'price-heading', label: 'What it costs' },
    ...(s.included?.length ? [{ id: 'included-heading', label: "What's included" }] : []),
    ...(s.notIncluded?.length ? [{ id: 'not-included-heading', label: "What isn't covered" }] : []),
    { id: 'gallery-heading', label: 'Our work' },
    ...(s.process?.length ? [{ id: 'process-heading', label: 'How the job goes' }] : []),
    ...(s.permits ? [{ id: 'permits-heading', label: 'Permits and inspection' }] : []),
    ...(s.faqs?.length ? [{ id: 'faq-heading', label: 'Common questions' }] : []),
    { id: 'areas-heading', label: 'Areas we cover' },
    ...(s.related?.length ? [{ id: 'related-heading', label: 'Related work' }] : []),
  ];"""

content = content.replace(old_toc, new_toc)

with open('app/[serviceSlug]/page.tsx', 'w') as f:
    f.write(content)
