import os

files_to_fix = {
    'app/coupons/page.tsx': [
        ('The diagnostic fee credited toward the repair if you go ahead', 'A transparent, flat-rate diagnostic fee'),
    ],
    'lib/services.ts': [
        ('Flat, credited to the repair', 'Flat rate'),
        ('The diagnostic fee credited against the repair', 'A transparent flat-rate diagnostic fee'),
        ('Before any repair work starts, you get the price in writing. The diagnostic fee you already paid comes off that total.', 'Before any repair work starts, you get the price in writing.'),
        ('A flat diagnostic fee, and it comes off the repair if you approve the work. You get the repair price in writing before anything starts, so there is never a surprise number at the end.', 'A flat diagnostic fee. Once we trace the issue, you get the repair price in writing before anything starts, so there is never a surprise number at the end.'),
        ('for a flat diagnostic fee in Parker.', 'for a flat diagnostic fee.'),
    ],
    'components/sections.tsx': [
        ('You get a fixed repair price before any work starts. The diagnostic fee comes off it.', 'You get a fixed repair price before any work starts.'),
        ('Free estimates on quoted work, and the diagnostic fee on a service call comes off the repair.', 'Free estimates on quoted work, and all repair pricing is provided in writing before work begins.')
    ]
}

for file_path, replacements in files_to_fix.items():
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        for old_str, new_str in replacements:
            content = content.replace(old_str, new_str)
        with open(file_path, 'w') as f:
            f.write(content)
