import re

with open('components/TrustBadges.tsx', 'r') as f:
    content = f.read()

# Change the undatedBadges list to be empty to effectively remove the badges until the client provides links
content = re.sub(
    r'const undatedBadges: Badge\[\] = \[.*?\];',
    'const undatedBadges: Badge[] = []; // Removed per audit until external links/decision provided',
    content,
    flags=re.DOTALL
)

with open('components/TrustBadges.tsx', 'w') as f:
    f.write(content)
