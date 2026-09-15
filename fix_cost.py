import re

with open('components/sections.tsx', 'r') as f:
    content = f.read()

content = content.replace("What it costs {service.slug.includes('parker') ? 'in Parker' : 'in Douglas County'}", "What it costs")

with open('components/sections.tsx', 'w') as f:
    f.write(content)
