import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    
    # 1.4 Do not imply the same person sells, books, and does the work
    content = re.sub(r'We do the work ourselves, so the person you booked is the person who turns up at your door\.', '', content)
    content = re.sub(r'Nothing gets handed off to a subcontractor or a different crew\.', '', content)
    content = re.sub(r'The same two electricians every time', 'A trusted, licensed electrician every time', content, flags=re.IGNORECASE)
    content = re.sub(r'One of our licensed electricians, never a subcontractor', 'One of our licensed electricians', content)
    content = re.sub(r'and never a rotating crew, so the person who diagnoses the problem is the same person who fixes it\.', 'so a trusted, licensed electrician handles your job.', content)
    
    # 1.5 Diagnostic fee language
    content = re.sub(r'A diagnostic visit is a flat fee that comes off the repair if you go ahead\.', 'A diagnostic visit is a flat fee, and if any repairs or replacements are needed, we\'ll give you the price in writing before we start any work.', content)
    content = re.sub(r', and it comes off the work if you go ahead', '', content)
    
    # 1.6 Hours
    content = re.sub(r'Weekend or after-hours dispatch, we are weekdays 8am to 6pm only', 'We are weekdays 8am to 6pm only', content)
    content = re.sub(r'A call outside those hours goes to voicemail and gets a callback first thing the next business day\.', '', content)
    
    # 1.7 Drive time
    content = re.sub(r'Within 2 hours in Parker', 'Within 2 hours in the South Denver metro', content)
    content = re.sub(r'Castle Rock and Highlands Ranch add 15 to 20 minutes of drive time\.', '', content)
    content = re.sub(r'Castle Rock and Highlands Ranch add about 20 minutes of drive time\.', '', content)
    content = re.sub(r'across most of Parker\.', '', content)
    
    # 1.9 Copy cleanup
    content = re.sub(r'in plain English', '', content)
    content = re.sub(r'in plain English, ', '', content)
    content = re.sub(r', in plain English', '', content)
    content = re.sub(r'The cause in plain English', 'The cause', content)
    content = re.sub(r'Houses, not warehouses\.', '', content)
    
    # 9.0 Service pages generic
    content = re.sub(r'in Real Parker Homes', '', content)
    content = re.sub(r'Outlets in Real Parker Homes', 'Our Outlet Work', content)
    content = re.sub(r'Switches in Real Parker Homes', 'Our Switch Work', content)
    
    # FAQs removal
    # Question: "Will the same electrician who diagnoses it also fix it?"
    # Find the whole block of this question in TS
    faq_q = r"\{\s*q:\s*'Will the same electrician who diagnoses it also fix it\?',\s*a:\s*\"Yes\. We are a growing company, so the licensed electrician who arrives and finds the cause is the one who repairs it\. Nothing gets handed off to a subcontractor or a different crew\.\",\s*\},?"
    content = re.sub(faq_q, '', content)

    # 9.1 Emergency Repairs page
    content = re.sub(r"\{\s*label:\s*'Typical response',\s*value:\s*'Within 2 hours in Parker'\s*\},?", "", content)
    
    # Are you available on weekends or after hours? (in services.ts maybe?)
    weekend_q = r"q:\s*'Are you available on weekends or after hours\?',\s*a:\s*'[^']+'"
    content = re.sub(weekend_q, "q: 'Are you available on weekends or after hours?',\n        a: 'We are open weekdays, 8am to 6pm. Call for a same-day urgent time slot.'", content)

    # How fast can someone get there?
    fast_q = r"q:\s*'How fast can someone get here\?',\s*a:\s*'[^']+'"
    content = re.sub(fast_q, "q: 'How fast can someone get here?',\n        a: 'During business hours, we can typically be anywhere in the South Denver metro within 2 hours.'", content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for path in ['lib/services.ts', 'lib/cities.ts']:
    process_file(path)
