import re

with open('app/about/page.tsx', 'r') as f:
    content = f.read()

# Replace the PageIntro
old_intro = """      <PageIntro
        eyebrow="About"
        title="Allsafe Electric - licensed, local, residential."
        lead="No call center, no rotating crew. A licensed master electrician answers the phone, and a licensed electrician does the work, start to finish, in your home."
        crumbs={crumbs}
      />"""
new_intro = """      <PageIntro
        eyebrow="About"
        title="Your trusted residential electricians for the south Denver metro."
        lead="We are a dedicated team of licensed professionals committed to delivering safe, reliable, and high-quality electrical work for every home we serve."
        crumbs={crumbs}
      />"""
content = content.replace(old_intro, new_intro)

# Replace the Team SectionHeading
old_team_heading = """            <SectionHeading
              eyebrow="The team"
              id="team-heading"
              title="Licensed electricians, not a rotating crew"
              highlight="Licensed electricians"
              lead="Most home-services companies send whoever is free. Allsafe sends a licensed electrician who does your job start to finish. The same person who answers the phone is the person who turns up."
            />"""
new_team_heading = """            <SectionHeading
              eyebrow="The team"
              id="team-heading"
              title="Expertise you can rely on"
              highlight="Expertise"
              lead="We bring decades of combined experience to every job. When you hire Allsafe Electric, you get dedicated, licensed professionals who see your project through from the initial estimate to the final inspection."
            />"""
content = content.replace(old_team_heading, new_team_heading)

# Replace the Standards card
old_standards = """                    Shoe covers go on at the door. Tools stay on a drop cloth. Nobody smokes on
                    your property. We are fine working around your pets. Every job is left cleaner
                    than we found it. These are company standards, not exceptions."""
new_standards = """                    Shoe covers go on at the door. Work areas are fully protected, and every job is left cleaner than we found it. We are polite, respectful of your home, and completely comfortable working around pets. These are company standards, not exceptions."""
content = content.replace(old_standards, new_standards)

with open('app/about/page.tsx', 'w') as f:
    f.write(content)
