import re

with open('components/BookingCard.tsx', 'r') as f:
    content = f.read()

content = content.replace("track.estimate", "track.book")

with open('components/BookingCard.tsx', 'w') as f:
    f.write(content)
