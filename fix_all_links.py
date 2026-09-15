import re

def strip_markdown_links(text):
    return re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)

with open('lib/services.ts', 'r') as f:
    content = f.read()

content = strip_markdown_links(content)

with open('lib/services.ts', 'w') as f:
    f.write(content)
