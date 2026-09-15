with open('lib/services.ts', 'r') as f:
    content = f.read()

content = content.replace("You call or book, and tell us", "You call or request a quote, and tell us")
content = content.replace("tell us when you book.", "tell us when you request the service.")
content = content.replace("Book it early.", "Schedule it early.")

with open('lib/services.ts', 'w') as f:
    f.write(content)
