import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Remove the schedule now button block:
# {/* Chris' review, 2026-09-08: "Add a schedule here or schedule now CTA button." */}
# <Link href="/book/" className="btn btn-ghost">
#   <CalendarIcon width={19} height={19} /> Schedule Now
# </Link>

pattern = r'\{\/\* Chris\' review.*?\<\/Link\>'
content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)
