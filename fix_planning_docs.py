import os
import re

def update_file(path, replacements):
    if not os.path.exists(path):
        print(f"Not found: {path}")
        return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements:
        if isinstance(old, re.Pattern):
            content = old.sub(new, content)
        else:
            if old not in content:
                print(f"Warning: could not find snippet in {path}:\n{old[:50]}...")
            content = content.replace(old, new)
            
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {path}")

# A1. CLAUDE.md
update_file("planning/CLAUDE.md", [
    (
        'Client of Built Right Digital. Owner/operator: **Judson "Jud" Cushing**.',
        'Client of Built Right Digital. Owner: Judson "Jud" Cushing, master electrician.\nThe site represents the COMPANY, not any individual. See §7.'
    ),
    (
        'Review count:      149\nStar rating:       5.0\nYears in business: 8 (founded Jan 2018)\nTrade experience:  15+ years (Jud\'s time in the trade)\nService area:      21 communities across Douglas, Arapahoe, Elbert, and Jefferson counties',
        'Google reviews:    149\nRating:            5.0\nFounded:           January 2018 (8 years in business)\nJud\'s experience:  15+ years as a master electrician (NOT the company\'s age)\nGBP type:          Location-based at 11479 Pine Dr M-51 — citations must match exactly\nService area:      21 communities across 4 counties, all confirmed serviceable'
    ),
    (
        '- Plain language. Say "breaker box," not "load center," unless you then explain it.\n- Lead with reassurance and specificity, not superlatives. "A real person answers" beats\n  "unmatched customer service."\n- Never use "state-of-the-art," "cutting-edge," "one-stop shop," "we pride ourselves."\n- Short sentences. Second person. Active voice.\n- Every service page answers, in the first 100 words: what it is, what it costs to find out,\n  and how fast someone can be there.',
        '- Plain language. Say "breaker box," not "load center," unless you then explain it.\n- Lead with reassurance and specificity, not superlatives. "A real person answers" beats\n  "unmatched customer service."\n- Never use "state-of-the-art," "cutting-edge," "one-stop shop," "we pride ourselves."\n- Short sentences. Second person. Active voice.\n- Every service page answers, in the first 100 words: what it is, what it costs to find out,\n  and how fast someone can be there.\n\nNever name an individual employee in site copy. Trust promises are company standards, not personal ones. "A real person answers the phone" is correct. "Jud answers his own phone" is not — it breaks the day he hires a dispatcher.\n\nJustin does not appear anywhere on the site. Not in copy, metadata, alt text, schema, or image filenames. The only exception is verbatim customer review text, which is the customer\'s words and stays unedited.\n\nJud\'s name appears in exactly two places: the blog author byline (with Person schema and an author page) and one founder section on About, framed as the origin of the company\'s standards. Nowhere else.'
    ),
    (
        '| Internal planning notes in rendered HTML | Three confirmed instances render on public pages. Grep for staging notes before every deploy. |',
        '| Internal planning notes in rendered HTML | Three confirmed instances render on public pages. Grep for staging notes before every deploy. |\n| Vendor names in customer-facing copy | Never say "Housecall Pro" to a visitor. Say "book online any time." Same for CallRail, Vercel, any tool. |\n| Doc references leaking into body copy | Never write "Tier 0," "docs/09 §3," "indexation gate," or "staging note" into rendered output. Three of these shipped. |\n| British spellings | American English only. aluminum, neighborhood, minimize. "Aluminium wiring" is also a keyword mismatch. |\n| Two URL patterns for one page type | One pattern per page type, enforced in CI. Two complete city-page sets shipped. |'
    ),
    (
        '- [ ] Company voice throughout (no personal promises tied to a named individual)',
        '- [ ] Company voice throughout (no personal promises tied to a named individual)\n- [ ] Contains no individual employee name, no vendor name, no doc reference, no British spelling, and no number that isn\'t sourced from lib/business.ts.'
    )
])

# A2. docs/01-client-brief.md
update_file("planning/docs/01-client-brief.md", [
    (re.compile(r'Jud Cushing and Justin.*?\(2018\)'), 'Jud Cushing (2018)'),
    (re.compile(r'The two-man team.*?no subcontractors'), 'Licensed electricians, no subcontractors'),
    (
        '## 3. Audience analysis (Why they buy)',
        '## 3. Audience analysis (Why they buy)\n\n### 3.10 Positioning\nJud is scaling. The site is written for a growing company covering the south Denver metro. Nothing in the copy may assume a fixed headcount or a single person doing the work.\n'
    )
])

# A3. docs/02-design-system.md
update_file("planning/docs/02-design-system.md", [
    (re.compile(r'A real person picks up\. Usually Jud\.', re.IGNORECASE), 'A real person answers.'),
    (re.compile(r'Jud answers this line', re.IGNORECASE), 'A real person answers.'),
    (re.compile(r'Jud and Justin, clearly, repeatedly\.', re.IGNORECASE), 'real Allsafe electricians at work in real homes, unnamed.'),
    (
        '## 5. Components',
        '## 11. Section budget\n\nA page gets five or six content sections. Not twelve. Before adding a section, delete one.\n\nBanned as a default: eyebrow labels above every heading, four-box stat strips on interior pages, numbered card grids for non-sequential content, a bordered box around every block. These are the specific visual signature of generated sites and buyers recognize it now.\n\nLet content be prose in a plain container. Vary layout meaningfully between page types — a service page, a city page and About should not read as one template with different words.\n\nBoilerplate ratio: the repeated bottom-of-page block (CTA + form + footer) must not exceed 25% of a page\'s rendered text. On short service pages it currently outweighs the unique content, which is a real ranking problem, not a taste one.\n\n## 5. Components'
    )
])

# A4. docs/03-information-architecture.md
update_file("planning/docs/03-information-architecture.md", [
    (re.compile(r'/electrical-services-parker-co/'), '/electrical-services/'),
    (re.compile(r'/emergency-electrical-repairs-parker-co/'), '/emergency-electrical-repairs/'),
    (re.compile(r'every service page links to its 5 Tier-1 city variants', re.IGNORECASE), 'three or four contextual city links chosen for relevance. No 21-item flat link block on any page. Sitewide boilerplate link blocks dilute rather than concentrate.'),
    (
        '## 4. City pages',
        'Be aware changing URLs contradicts the preservation rule in docs/04, deliberately. Both old URLs are indexed on the live site and carry equity, so this is not free. 301 both, keep them in preserved-urls.csv as redirect targets, and monitor them specifically in the first 30 days. Log this in docs/99.\n\nOne canonical list of communities in data/service-areas.csv, rendered from that single source everywhere.\n\n## 4. City pages'
    ),
    (re.compile(r'/electrician-\[city\]/', re.IGNORECASE), '')
])

# A5. docs/07-conversion-spec.md
update_file("planning/docs/07-conversion-spec.md", [
    (
        '## 1. The three actions',
        '## 1.1 CTA honesty\n"Free Estimate" contradicts the FAQ\'s diagnostic fee. Either rename the button ("Get a Quote" / "Book a Visit") or surface the free-vs-paid distinction at the CTA itself. It cannot stay buried in an FAQ while the button says free.\n\n## 1. The three actions'
    )
])

# A6. docs/06-schema-spec.md
update_file("planning/docs/06-schema-spec.md", [
    (
        '## 1. Global (Organization / LocalBusiness)',
        'meta-author sitewide is Allsafe Electric. Person / Judson Cushing appears only in Article schema on blog posts and on his author page.\nareaServed in the root entity covers all 21 communities, not five.\nIf aggregateRating is ever added, it reads from lib/business.ts and must equal the real GBP numbers.\n\n## 1. Global (Organization / LocalBusiness)'
    )
])

# A7. docs/09-content-plan.md
update_file("planning/docs/09-content-plan.md", [
    (
        '## 3. Tier gates',
        '## 3. Tier gates\n\nA page is either published properly or it does not exist in the build. Never ship a noindex placeholder. The gate governs when a page gets written and released, not whether a stub sits in production waiting.\n\nAll 21 city pages need genuinely local detail — permit authority, electric utility (CORE vs Xcel splits across this footprint and is a real differentiator), housing stock and era, panel brands that turn up there. A page that is the Parker page with the city swapped will not rank, and 21 of them will drag the domain. This is the largest content workload on the project. Scope it before committing to a launch date.\n'
    )
])

# A8. docs/12-migration-runbook.md
update_file("planning/docs/12-migration-runbook.md", [
    (
        '## 1. Pre-flight',
        '## 1. Pre-flight\n\nStaging must be X-Robots-Tag: noindex at the Vercel domain level or password protected. The preview is currently fully indexable with canonicals pointing at the production domain. Make this a pre-flight checklist item, not a note.\n'
    )
])

# A9. docs/99-decisions-log.md
update_file("planning/docs/99-decisions-log.md", [
    (
        '# Decisions Log',
        '# Decisions Log\n\n**2026-09-16**: Applied remediation brief from staging audit.\n- De-personalized site to focus on company over Jud/Justin.\n- Unified city page URL pattern to /electricians/[city]-co/.\n- Corrected business facts to 149 reviews, 5.0 rating, 8 years in business.\n- Adjusted layout to respect section budget and avoid boilerplate repetition.\n- Stripped staging notes and vendor names from public output.\n- Set canonical GBP address.'
    )
])

