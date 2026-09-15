import re

with open('app/[serviceSlug]/page.tsx', 'r') as f:
    content = f.read()

# Replace <FeaturedTestimonial authorIndex={s.emergency ? 0 : 2} />
new_testimonial = "<FeaturedTestimonial authorIndex={s.slug.length % 4} />"
content = re.sub(r'<FeaturedTestimonial authorIndex=\{[^\}]+\} />', new_testimonial, content)
content = re.sub(r'<FeaturedTestimonial authorIndex=\d+ />', new_testimonial, content)

with open('app/[serviceSlug]/page.tsx', 'w') as f:
    f.write(content)
