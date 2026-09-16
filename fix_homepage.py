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

# app/page.tsx
page_replacements = [
    # 2.0 Trust signals bar
    # Actually wait, this is in components/sections.tsx or app/page.tsx. Let's see later.
    
    # 2.1 Services section
    (r"const featuredServices = \[\n\s*'emergency-electrical-repairs',\n\s*'electrical-wiring-repairs-services',\n\s*'electrical-outlet-services',\n\s*'electrical-switch-services',\n\];", 
     "const featuredServices = [\n  'emergency-electrical-repairs',\n  'electrical-panel-services',\n  'electrical-wiring-repairs-services',\n  'residential-ev-charging',\n];"),
    
    # 2.2 Common Electrical Problems links
    (r"'Parker grew fast between 1995 and 2015, so a lot of homes here are running 100A or 150A service that was sized before anyone owned an EV\. The panel is not broken, it is full\. A load calculation tells you whether you need a heavy-up to 200A or just some circuits rebalanced, and the answer is genuinely cheaper more often than people expect\.'", 
     "'Parker grew fast between 1995 and 2015, so a lot of homes here are running 100A or 150A service that was sized before anyone owned an <Link href=\"/residential-ev-charging/\" className=\"text-blue-600 hover:underline\">EV</Link>. The panel is not broken, it is full. A load calculation tells you whether you need a <Link href=\"/electrical-panel-services/\" className=\"text-blue-600 hover:underline\">heavy-up to 200A</Link> or just some circuits rebalanced, and the answer is genuinely cheaper more often than people expect.'"),
    
    (r"These turn up in the older Pinery and Ponderosa areas, mostly 1970s and 80s homes\. Both brands have a documented history of breakers that fail to trip under fault, which is the one job a breaker has\. If you have one, replacement is not an upsell, it is the fix\. We will tell you plainly which brand you have and show you the label\.", 
     "These turn up in the older <Link href=\"/electricians/the-pinery-co/\" className=\"text-blue-600 hover:underline\">Pinery</Link> and Ponderosa areas, mostly 1970s and 80s homes. Both brands have a documented history of breakers that fail to trip under fault, which is the one job a breaker has. If you have a <Link href=\"/electrical-panel-services/\" className=\"text-blue-600 hover:underline\">Federal Pacific or Zinsco panel</Link>, <Link href=\"/electrical-panel-services/\" className=\"text-blue-600 hover:underline\">replacement</Link> is not an upsell, it is the fix. We will tell you plainly which brand you have and show you the label."),
    
    (r"Some Parker-area homes from that same era have aluminum branch circuits\. Aluminum is not automatically dangerous, but it expands and contracts differently than copper, so connections loosen over time and loose connections are what start fires\. The fix is proper connectors at every device, not rewiring the whole house\.",
     "Some Parker-area homes from that same era have <Link href=\"/electrical-wiring-repairs-services/\" className=\"text-blue-600 hover:underline\">aluminum branch circuits</Link>. Aluminum is not automatically dangerous, but it expands and contracts differently than copper, so connections loosen over time and loose connections are what start fires. The fix is proper connectors at every device, not rewiring the whole house."),
    
    (r"All three are big continuous loads and all three need a permit\. Start with a load calculation rather than a guess, because the answer determines whether you need a service upgrade first\. Worth knowing: most of Parker is on CORE Electric Cooperative, not Xcel, so most Colorado rebate articles you will read online do not apply to your address\.",
     "All three are big continuous loads and all three need a permit. Start with a load calculation rather than a guess, because the answer determines whether you need a service upgrade first. Worth knowing: most of Parker is on CORE Electric Cooperative, not Xcel, so most Colorado rebate articles you will read online do not apply to your address."),
    # Wait, the EV / hot tub / generator part was in the Title maybe?
    # Actually the instruction says: "04 EV/hot tub/generator	'EV charger,' 'hot tub,' 'generator'"
    # Ah, let's fix it properly using React string elements instead of hardcoded Link inside string if it's rendered as string.
    # `commonProblems` objects use string body. We need to render it as ReactNode. Let's see how `p.body` is rendered.
    # `<p className="mt-2.5 text-body text-slate">{p.body}</p>`
    # If `p.body` is changed to JSX, we must remove quotes around the object's body.
]

process_file('app/page.tsx', page_replacements)
