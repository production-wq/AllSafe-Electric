import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("from-navy-deep/95 via-navy/80 to-navy-light/55", "from-navy-deep/95 via-navy-deep/90 to-navy-deep/80")
content = content.replace("from-navy-deep via-transparent to-navy-deep/40", "from-navy-deep via-navy-deep/60 to-navy-deep/50")

with open('app/page.tsx', 'w') as f:
    f.write(content)
