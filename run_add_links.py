import os
import re

blog_dir = 'content/blog'
files = [f for f in os.listdir(blog_dir) if f.endswith('.md')]

def add_links(content):
    # Try to add 3 links, only replacing the first occurrence of each term outside of existing links
    
    # 1. Panel services
    if 'electrical panel' in content and '](/electrical-panel-services/)' not in content:
        content = re.sub(r'(?<!\[)(electrical panel)(?!\])', r'[\1](/electrical-panel-services/)', content, count=1)
    elif 'breaker panel' in content and '](/electrical-panel-services/)' not in content:
        content = re.sub(r'(?<!\[)(breaker panel)(?!\])', r'[\1](/electrical-panel-services/)', content, count=1)
    
    # 2. Service area
    if 'Parker' in content and '](/service-area/)' not in content:
        content = re.sub(r'(?<!\[)(Parker)(?!\])', r'[\1](/service-area/)', content, count=1)
    elif 'Denver' in content and '](/service-area/)' not in content:
        content = re.sub(r'(?<!\[)(Denver)(?!\])', r'[\1](/service-area/)', content, count=1)
    elif 'Front Range' in content and '](/service-area/)' not in content:
        content = re.sub(r'(?<!\[)(Front Range)(?!\])', r'[\1](/service-area/)', content, count=1)
    
    # 3. Emergency or wiring or EV
    if 'emergency' in content and '](/emergency-electrical-repairs/)' not in content:
        content = re.sub(r'(?<!\[)(emergency)(?!\])', r'[\1](/emergency-electrical-repairs/)', content, count=1)
    elif 'wiring' in content and '](/electrical-wiring-repairs-services/)' not in content:
        content = re.sub(r'(?<!\[)(wiring)(?!\])', r'[\1](/electrical-wiring-repairs-services/)', content, count=1)
    elif 'electrician' in content and '](/about/)' not in content:
        content = re.sub(r'(?<!\[)(electrician)(?!\])', r'[\1](/about/)', content, count=1)
        
    return content

for filename in files:
    filepath = os.path.join(blog_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = add_links(content)
    
    # Check if we added enough links, if not, add more fallbacks
    links = [r'(/electrical-panel-services/)', r'(/service-area/)', r'(/about/)', r'(/emergency-electrical-repairs/)', r'(/electrical-wiring-repairs-services/)']
    count = sum(1 for link in links if link in new_content)
    
    if count < 3:
        if 'safety' in new_content and '](/home-electrical-safety-inspections/)' not in new_content:
            new_content = re.sub(r'(?<!\[)(safety)(?!\])', r'[\1](/home-electrical-safety-inspections/)', new_content, count=1)
        if 'outlet' in new_content and '](/electrical-outlet-services/)' not in new_content:
            new_content = re.sub(r'(?<!\[)(outlet)(?!\])', r'[\1](/electrical-outlet-services/)', new_content, count=1)
        if 'house' in new_content and '](/about/)' not in new_content:
            new_content = re.sub(r'(?<!\[)(house)(?!\])', r'[\1](/about/)', new_content, count=1)
            
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filename}")
