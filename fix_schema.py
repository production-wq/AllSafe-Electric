import re

path = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/lib/schema.ts'
with open(path, 'r') as f:
    content = f.read()

# Make sure cities are imported
if "import { cities, tier2Areas, tier3Neighborhoods } from './cities';" not in content:
    content = content.replace("import { SITE_URL, business } from './business';", "import { SITE_URL, business } from './business';\nimport { cities, tier2Areas, tier3Neighborhoods } from './cities';")

# Replace areaServed in businessNode
areaServed_business = """areaServed: [
      ...cities.map((c) => ({ '@type': 'City' as const, name: c.name, containedInPlace: { '@type': 'AdministrativeArea' as const, name: `${c.county} County, Colorado` } })),
      ...tier2Areas.map((name) => ({ '@type': 'City' as const, name })),
      ...tier3Neighborhoods.map((name) => ({ '@type': 'Neighborhood' as const, name })),
    ],"""
content = re.sub(r"areaServed:\s*\[[\s\S]*?\n\s*\],", areaServed_business, content, count=1)

# Replace areaServed in serviceNode
areaServed_service = """areaServed: [
      ...cities.map((c) => ({ '@type': 'City' as const, name: c.name })),
      ...tier2Areas.map((name) => ({ '@type': 'City' as const, name })),
      ...tier3Neighborhoods.map((name) => ({ '@type': 'Neighborhood' as const, name })),
    ],"""
content = re.sub(r"areaServed:\s*\[[\s\S]*?\]\.map\([\s\S]*?\),", areaServed_service, content)

with open(path, 'w') as f:
    f.write(content)
