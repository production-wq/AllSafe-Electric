with open('components/cta.tsx', 'r') as f:
    content = f.read()

# Replace Book Online with Get a Quote
content = content.replace("Book Online", "Get a Quote")
content = content.replace("Get a Free Estimate", "Get a Quote")
content = content.replace("Get a free estimate", "Get a quote")

with open('components/cta.tsx', 'w') as f:
    f.write(content)
