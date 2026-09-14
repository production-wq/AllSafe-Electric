import os
import re

directories = ['app', 'components', 'lib']
base_dir = '/Users/saikatchowdhury444gmail.com/Desktop/AllSafe-Electric/'

for d in directories:
    for root, _, files in os.walk(os.path.join(base_dir, d)):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # We want to replace `/electrician-${c.slug}/` with `/electricians/${c.slug}-co/`
                # And `/electrician-${slug}/` with `/electricians/${slug}-co/`
                # And `/electrician-parker/` with `/electricians/parker-co/` etc.
                
                new_content = content
                new_content = new_content.replace('`/electrician-${c.slug}/`', '`/electricians/${c.slug}-co/`')
                new_content = new_content.replace('`/electrician-${slug}/`', '`/electricians/${slug}-co/`')
                new_content = new_content.replace('`/electrician-${oc!.slug}/`', '`/electricians/${oc!.slug}-co/`')
                new_content = new_content.replace("`/electrician-${c.slug}/${s.cityServiceSlug}/`", "`/electricians/${c.slug}-co/${s.cityServiceSlug}/`")
                new_content = new_content.replace("`/electrician-${c.slug}/`", "`/electricians/${c.slug}-co/`")
                
                if new_content != content:
                    with open(path, 'w') as f:
                        f.write(new_content)
                    print(f"Fixed {path}")

print("Done")
