import re

with open('components/sections.tsx', 'r') as f:
    content = f.read()

old_paragraph = """<p className="mt-5 rounded-btn bg-white/70 px-4 py-3 text-small text-slate">
          {p.needsApproval
            ? 'This is a general estimate based on typical Front Range homes. A firm quote is provided in writing after we see the job.'
            : 'Price is confirmed in writing before work begins.'}
        </p>"""

new_paragraph = """<p className="mt-5 rounded-btn bg-white/70 px-4 py-3 text-small text-slate">
          Pricing shown is a general range based on typical homes in our service area. All work is properly scoped and a fixed repair price is provided in writing before any work begins.
        </p>"""

content = content.replace(old_paragraph, new_paragraph)

with open('components/sections.tsx', 'w') as f:
    f.write(content)
