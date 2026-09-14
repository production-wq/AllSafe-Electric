import re

with open('next.config.mjs', 'r') as f:
    content = f.read()

# Replace the known live-site hub inconsistency redirect
old_redirect = """      {
        source: '/electrical-services/',
        destination: '/electrical-services-parker-co/',
        permanent: true,
      },"""

new_redirect = """      {
        source: '/electrical-services-parker-co/',
        destination: '/electrical-services/',
        permanent: true,
      },
      {
        source: '/emergency-electrical-repairs-parker-co/',
        destination: '/emergency-electrical-repairs/',
        permanent: true,
      },"""

content = content.replace(old_redirect, new_redirect)

# Replace destination: '/emergency-electrical-repairs-parker-co/'
content = content.replace("destination: '/emergency-electrical-repairs-parker-co/',", "destination: '/emergency-electrical-repairs/',")

with open('next.config.mjs', 'w') as f:
    f.write(content)
