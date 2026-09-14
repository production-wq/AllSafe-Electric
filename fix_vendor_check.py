import re

path = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/scripts/audit-seo.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace vendor check
vendor_check = """  // 2. Vendor names
  const vendors = ['housecall pro', 'callrail'];
  for (const vendor of vendors) {
    if (visibleText.toLowerCase().includes(vendor) && page !== '/privacy-policy/') {
      err(page, `vendor name found in visible text: "${vendor}"`);
    }
  }"""

content = re.sub(r"  // 2\. Vendor names[\s\S]*?err\(page, `vendor name found in visible text.*?;\n    }\n  }", vendor_check, content)

with open(path, 'w') as f:
    f.write(content)
print('Fixed vendor check')
