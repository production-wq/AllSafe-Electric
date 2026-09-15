with open('lib/services.ts', 'r') as f:
    content = f.read()

content = content.replace("secondaryKeywords: '[surge protection installation colorado'],", "secondaryKeywords: ['surge protection installation colorado'],")
content = content.replace("secondaryKeywords: ['[surge protection installation colorado'],", "secondaryKeywords: ['surge protection installation colorado'],")

with open('lib/services.ts', 'w') as f:
    f.write(content)
