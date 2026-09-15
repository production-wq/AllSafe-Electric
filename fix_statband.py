import re

with open('components/sections.tsx', 'r') as f:
    content = f.read()

content = content.replace("block font-display text-4xl font-extrabold tracking-tight lg:text-5xl", "block font-display text-3xl font-bold tracking-tight lg:text-4xl")

with open('components/sections.tsx', 'w') as f:
    f.write(content)
