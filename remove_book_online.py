import os

def replace_in_file(filepath, old, new):
    with open(filepath, 'r') as f:
        content = f.read()
    if old in content or old.lower() in content.lower():
        # case insensitive replacement
        import re
        content = re.sub(re.compile(old, re.IGNORECASE), new, content)
        with open(filepath, 'w') as f:
            f.write(content)

replace_in_file('app/contact/page.tsx', 'book online', 'request a quote')
replace_in_file('app/privacy-policy/page.tsx', 'book online', 'request a quote')
replace_in_file('app/[serviceSlug]/page.tsx', 'Book online', 'Request a quote')
replace_in_file('app/[serviceSlug]/page.tsx', 'book online', 'request a quote')
replace_in_file('app/about/page.tsx', 'book online', 'request a quote')
replace_in_file('app/page.tsx', 'Call or book online', 'Call or request a quote')
replace_in_file('app/page.tsx', 'book online', 'request a quote')
replace_in_file('components/BookEmbed.tsx', 'Book online', 'Request a quote')
replace_in_file('lib/business.ts', 'book online', 'request a quote')
replace_in_file('lib/faqs.ts', 'Can I book online instead of calling?', 'Can I request a quote online instead of calling?')
replace_in_file('lib/hours.ts', 'book online', 'request a quote')
replace_in_file('lib/services.ts', 'book online', 'request a quote')
