import re

def process_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
        
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

# app/about/page.tsx
page_replacements = [
    # 3.1 Main photo
    (r"allsafe-electrician-blue-uniform-kitchen-portrait\.JPG", "owner-at-kitchen-table-with-customers.jpg"),
    
    # 3.2 Stat band
    (r"\{\s*value:\s*'8\+',\s*label:\s*'Years in business',\s*icon:\s*<ClockIcon width=\{20\} height=\{20\} />\s*\},[\s\S]*?\{\s*value:\s*`\$\{cities\.length\}`,\s*label:\s*'Communities we serve',\s*icon:\s*<MapPinIcon width=\{20\} height=\{20\} />\s*\},", 
     """{ value: 'Local', label: 'Parker Electricians', icon: <MapPinIcon width={20} height={20} /> },
                { value: 'Decades', label: 'Of combined experience', icon: <ClockIcon width={20} height={20} /> },
                { value: 'A+', label: 'BBB Rating', icon: <ShieldIcon width={20} height={20} /> },
                { value: '100%', label: 'Guaranteed Work', icon: <ShieldIcon width={20} height={20} /> },"""),
    
    # 3.3 Who we are
    (r"<h2 className=\"text-h2\">Why the business exists</h2>", "<h2 className=\"text-h2\">Who We Are and What We Believe</h2>"),
    
    # 3.4 Houses not warehouses
    (r"Allsafe is a residential contractor, houses, not warehouses\.", "Allsafe is a residential contractor."),
]

process_file('app/about/page.tsx', page_replacements)
