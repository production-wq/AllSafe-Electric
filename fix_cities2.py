import re

with open('lib/cities.ts', 'r') as f:
    content = f.read()

# Replace all variations of time/distance
content = re.sub(r'Roughly \d+ minutes in your area, one of the fastest areas we cover.', 'A core part of our local service area.', content)
content = re.sub(r'Stonegate is about six minutes out, so during business hours we are frequently on site within the hour.', 'Stonegate is a core part of our service area, so during business hours we can frequently be on site quickly.', content)
content = re.sub(r'Castle Pines is about 16 minutes down I-25 from the shop\.', 'Castle Pines is a core part of our service area.', content)
content = re.sub(r'Franktown is about 15 minutes out and it is acreage country\.', 'Franktown is acreage country.', content)
content = re.sub(r'Elizabeth is about 25 minutes out in Elbert County\.', 'Elizabeth is fully covered in Elbert County.', content)
content = re.sub(r'It is about 25 minutes in your area and it is on our regular service-area list\.', 'It is on our regular service-area list.', content)
content = re.sub(r'Elbert is about 35 minutes out and it is true acreage country\.', 'Elbert is true acreage country.', content)
content = re.sub(r'It is roughly 35 minutes, so scheduled work is easy to arrange', 'Scheduled work is easy to arrange', content)
content = re.sub(r'it is about 26 minutes, so same-day', 'same-day', content)
content = re.sub(r'At about 30 minutes it is best booked', 'It is best booked', content)
content = re.sub(r'at roughly 35 minutes, Lakewood is best booked', 'Lakewood is best booked', content)
content = re.sub(r'At about 35 minutes, scheduled work', 'Scheduled work', content)
content = re.sub(r'Edgewater is about 38 minutes out and it is the oldest housing stock we cover\.', 'Edgewater features some of the oldest housing stock we cover.', content)
content = re.sub(r'at about 38 minutes it is the outer edge of our range and it suits', 'it suits', content)
content = re.sub(r'roughly 32 minutes out\.', 'fully within our service area.', content)

with open('lib/cities.ts', 'w') as f:
    f.write(content)
