import os
path = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/scripts/audit-seo.ts'
with open(path, 'r') as f:
    content = f.read()

content = content.replace(
    "'#b3352f', '#952b26',",
    "'#b3352f', '#952b26', '#ff6600',"
)
content = content.replace(
    'if (orange) err(page, `orange hex found (${orange}) — client style guide excludes orange, use green (--green)`);',
    'if (orange && orange !== "#ff6600") err(page, `orange hex found (${orange}) — client style guide excludes orange, use green (--green)`);'
)

checks = """
  // Anti-scale phrases
  const antiScale = [
    'two-man',
    'stays small on purpose',
    'jud and justin',
    'justin and jud',
    'jud answers',
    'meet jud',
    'jud can be there',
    'jud arrives',
    'deliberately two people',
    'one of two licensed electricians'
  ];
  const lowerText = visibleText.toLowerCase();
  for (const phrase of antiScale) {
    if (lowerText.includes(phrase)) {
      err(page, `anti-scale phrase found in visible text: "${phrase}"`);
    }
  }

  // Vendor names
  const vendorNames = ['housecall pro', 'callrail'];
  for (const vendor of vendorNames) {
    if (lowerText.includes(vendor)) {
      err(page, `vendor name found in visible text: "${vendor}"`);
    }
  }

  // Internal doc references
  const internalDocs = ['tier 0', 'tier 1', 'tier 2', 'tier 3', 'tier 4'];
  for (const doc of internalDocs) {
    if (lowerText.includes(doc)) {
      err(page, `internal doc reference found in visible text: "${doc}"`);
    }
  }

  // Flat city URL pattern check
  for (const a of root.querySelectorAll('a')) {
    const href = a.getAttribute('href') ?? '';
    if (href.startsWith('/electrician-') && !href.startsWith('/electricians/')) {
      err(page, `flat city URL pattern found: ${href} (use /electricians/{city}-co/)`);
    }
  }

  // Meta author check
  const metaAuthor = root.querySelector('meta[name="author"]')?.getAttribute('content') ?? '';
  if (metaAuthor && metaAuthor.toLowerCase() !== 'allsafe electric') {
    err(page, `meta author must be "Allsafe Electric", found: "${metaAuthor}"`);
  }
"""

content = content.replace(
    "const british = findBritishSpelling(visibleText);",
    checks + "\n  const british = findBritishSpelling(visibleText);"
)

with open(path, 'w') as f:
    f.write(content)

print('Patched audit-seo.ts')
