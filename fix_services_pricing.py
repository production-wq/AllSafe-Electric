import re

with open('lib/services.ts', 'r') as f:
    content = f.read()

# Fix "comes off the repair if you go ahead"
content = content.replace("A diagnostic visit is a flat fee that comes off the repair if you go ahead.", "A diagnostic visit is a transparent, flat fee.")

# Fix "A flat fee agreed before the visit, with no hourly surprise" -> "A fixed repair price before any work begins"
content = content.replace("A flat fee agreed before the visit, with no hourly surprise", "A fixed repair price provided before any work begins")

# Pricing range disclaimer: 
# Currently, services have `price: { amount: '...', label: '...' }`. We should find where it renders or add it to the services.
