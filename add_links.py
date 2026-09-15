import re

with open('lib/services.ts', 'r') as f:
    content = f.read()

# Add a few internal links to cross-pollinate
content = content.replace('panel upgrade', '[panel upgrade](/electrical-panel-services/)')
content = content.replace('EV charger', '[EV charger](/residential-ev-charging/)')
content = content.replace('surge protection', '[surge protection](/whole-home-surge-protection/)')
content = content.replace('electrical inspection', '[electrical inspection](/home-electrical-safety-inspections/)')

with open('lib/services.ts', 'w') as f:
    f.write(content)
