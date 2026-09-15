import re

def strip_markdown_links(text):
    # Replaces [Link Text](/url/) with Link Text
    return re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)

with open('lib/services.ts', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    # Check if the line is one of the fields that shouldn't have links
    if re.match(r'^\s*(h1|title|navLabel|heroAlt|imageBrief|primaryKeyword|secondaryKeywords|q|h3):\s', line):
        lines[i] = strip_markdown_links(line)
        
    # Also fix lists of strings if they are secondaryKeywords etc
    if 'secondaryKeywords' in line or 'primaryKeyword' in line:
        lines[i] = strip_markdown_links(line)

with open('lib/services.ts', 'w') as f:
    f.writelines(lines)
