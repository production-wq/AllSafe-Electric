import re

with open('lib/cities.ts', 'r') as f:
    content = f.read()

# Replace any "About X minutes from the Parker shop" style strings
content = re.sub(r'About \d+ minutes from the Parker shop\.? ?', 'Local service across the metro area. ', content)
content = re.sub(r'About \d+ minutes to south Aurora from the Parker shop\.? ?', 'Local service across south Aurora. ', content)
content = re.sub(r'About \d+ minutes to south Denver from the Parker shop\.? ?', 'Local service across south Denver. ', content)
content = re.sub(r"About \d+ minutes from our Parker shop[,a-zA-Z \.]*", 'Serving your local community daily.', content)

# Replace other mentions in body copy
content = re.sub(r'is about \d+ minutes from the shop and it ', 'is a core part of our service area and it ', content)
content = re.sub(r'is about \d+ minutes from the shop, and the work there ', 'is a core part of our service area, and the work there ', content)
content = re.sub(r'is about \d+ minutes from the shop, and it is ', 'is a core part of our service area, and it is ', content)
content = re.sub(r'is twelve minutes from the shop and it ', 'is a core part of our service area and it ', content)
content = re.sub(r'roughly \d+ minutes from the Parker shop\.?', '', content)
content = re.sub(r'roughly \d+ minutes from the shop\.?', '', content)
content = re.sub(r'is about \d+ minutes from the shop\. ', 'is fully covered by our team. ', content)

# Check specifically for "from our Parker shop"
content = re.sub(r'from our Parker shop', 'in your area', content)
content = re.sub(r'from the Parker shop', 'in your area', content)

with open('lib/cities.ts', 'w') as f:
    f.write(content)
