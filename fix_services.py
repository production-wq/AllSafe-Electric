import re

path = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/lib/services.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace 'in Parker, CO' and 'in Parker' from H1s and Titles
# H1:
content = re.sub(r"(h1:\s*'[A-Z][^']+) in Parker(?:,\s*CO)?(')", r"\1\2", content, flags=re.IGNORECASE)
# Title pattern: Service Name | South Denver Metro | Allsafe Electric
# Currently they are like 'title: 'Emergency Electrician in Parker, CO | Allsafe Electric','
def title_repl(match):
    # e.g. Emergency Electrician in Parker, CO | Allsafe Electric
    # We just want the part before " in Parker"
    service = match.group(1).strip()
    return f"title: '{service} | South Denver Metro | Allsafe Electric'"

content = re.sub(r"title:\s*'([^']+?)\s+in Parker(?:,\s*CO)?\s*(?:\|\s*Allsafe(?: Electric)?)?'", title_repl, content, flags=re.IGNORECASE)

with open(path, 'w') as f:
    f.write(content)
print('Fixed lib/services.ts')
