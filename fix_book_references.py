import re

# 1. sections.tsx
with open('components/sections.tsx', 'r') as f:
    content = f.read()

content = content.replace("You call or book online. A real person picks up during business hours.", "You request a quote online or give us a call. A real person picks up during business hours.")
content = content.replace("Book a visit online any time, or call and talk it through with a real person.", "Request a quote online any time, or call and talk it through with a real person.")
content = content.replace("A flat fee agreed before the visit, with no hourly surprise", "A fixed repair price provided before any work begins")

with open('components/sections.tsx', 'w') as f:
    f.write(content)

# 2. StickyBar.tsx
with open('components/StickyBar.tsx', 'r') as f:
    content = f.read()

content = content.replace("Book", "Quote")
content = content.replace("bookUrl", "quoteUrl")
content = content.replace("business.bookingUrl", "'/contact#estimate'")
content = content.replace("calendar", "file-text") # Maybe icon if mentioned, but CalendarIcon is used.

with open('components/StickyBar.tsx', 'w') as f:
    f.write(content)

# 3. BookingCard.tsx
with open('components/BookingCard.tsx', 'r') as f:
    content = f.read()

content = content.replace("Book a visit", "Get a Quote")
content = content.replace("track.book", "track.estimate")
content = content.replace("business.bookingUrl", "'/contact#estimate'")

with open('components/BookingCard.tsx', 'w') as f:
    f.write(content)
