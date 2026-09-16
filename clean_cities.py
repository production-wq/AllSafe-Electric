import re

def process_cities(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    
    # 1.7 Drive time / "from the Parker shop" / "minutes" removals
    content = re.sub(r', about \d+ minutes from Parker,', ',', content)
    content = re.sub(r', about \d+ minutes from the Parker shop,', ',', content)
    content = re.sub(r' about \d+ minutes in your area, so ', ' ', content)
    content = re.sub(r' is about \d+ minutes from Parker and ', ' ', content)
    content = re.sub(r' is ten minutes from the shop and it ', ' ', content)
    content = re.sub(r' is close enough to the Parker shop that we are there most weeks, and the work has a distinct character\.', ' The work has a distinct character.', content)
    content = re.sub(r' is minutes from the shop\.', '.', content)
    content = re.sub(r' is one of the closest neighborhoods to our shop, and electrically it ', ' electrically ', content)
    content = re.sub(r' is about \d+ minutes from Parker\.', '.', content)
    content = re.sub(r' is \d+ minutes from the shop\.', '.', content)
    content = re.sub(r' \d+ minutes from the shop\.', '.', content)
    content = re.sub(r' About \d+ minutes from Parker\.', '', content)
    content = re.sub(r' \d+ minutes from Parker, one of the closer service areas\.', '', content)
    content = re.sub(r' from the Parker shop, about \d+ minutes\.', '.', content)
    content = re.sub(r' \d+ minutes from the shop\.', '.', content)
    content = re.sub(r' 32 minutes from the shop\.', '.', content)
    content = re.sub(r' from the Parker shop', '', content)
    content = re.sub(r' from the shop', '', content)
    
    # Denver
    content = re.sub(r'Denver is a big enough market that the only useful thing to say is which part of it we serve and what the work involves\.', 'We cover South Denver regularly.', content)

    # Parker FAQ drive time
    content = re.sub(r'We are based here, so there is no drive time added to a Parker appointment window, unlike Castle Rock or Highlands Ranch, which add \d+ to \d+ minutes\.', 'We are based here.', content)
    
    # 1.8 Standard "What area do you cover?" answer for FAQs
    faq_area = r"We cover the full South Denver metro area, including Parker, Castle Rock, Highlands Ranch, Lone Tree, Centennial, The Pinery, Stonegate, Castle Pines, Franktown, Elizabeth, Elbert, Foxfield, Dove Valley, Aurora, Englewood, Littleton, Acres Green, Greenwood Village, Lakewood, Edgewater, and Denver\."
    content = re.sub(r"q:\s*'What area do you cover\?',\s*a:\s*'[^']+'", f"q: 'What area do you cover?',\n        a: '{faq_area}'", content)
    content = re.sub(r"q:\s*'Do you service [^']+\?',\s*a:\s*'Yes\. We cover [^']+'", f"q: 'What area do you cover?',\n        a: '{faq_area}'", content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

process_cities('lib/cities.ts')
process_cities('lib/services.ts')
