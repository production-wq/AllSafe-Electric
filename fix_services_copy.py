with open('lib/services.ts', 'r') as f:
    content = f.read()

# Re-apply the flat fee and pricing fixes:
content = content.replace("A flat fee agreed before the visit, with no hourly surprise.", "A fixed repair price provided before any work begins.")
content = content.replace("A flat fee agreed before the visit, with no hourly surprise", "A fixed repair price provided before any work begins")

# Replace book online:
content = content.replace('book online', 'request a quote')
content = content.replace('Book online', 'Request a quote')
content = content.replace("You call or book, and tell us", "You call or request a quote, and tell us")
content = content.replace("tell us when you book.", "tell us when you request the service.")
content = content.replace("Book it early.", "Schedule it early.")

# Diagnostic fee:
content = content.replace("The diagnostic fee credited toward the repair if you go ahead", "A transparent flat-rate diagnostic fee")

with open('lib/services.ts', 'w') as f:
    f.write(content)
