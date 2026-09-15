import re

with open('lib/services.ts', 'r') as f:
    lines = f.readlines()

def strip_link(line):
    # This will strictly only replace [text](/link) on a single line
    # without matching across newlines because it's applied per line.
    return re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', line)

for i in range(len(lines)):
    lines[i] = strip_link(lines[i])

with open('lib/services.ts', 'w') as f:
    f.writelines(lines)
