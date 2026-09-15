import re

with open('components/cta.tsx', 'r') as f:
    content = f.read()

# Make BookButton just link to #estimate
new_book_btn = """export function BookButton({
  location,
  service,
  variant = 'primary',
  className = '',
  children,
}: {
  location: Loc;
  service?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/contact#estimate"
      data-cta="quote"
      data-location={location}
      className={btnClass(variant, className)}
    >
      {children ?? (
        <>
          <CalendarIcon width={19} height={19} /> Get a Quote
        </>
      )}
    </Link>
  );
}"""

# Replace the old BookButton definition
content = re.sub(r'export function BookButton.*?</a>\n  \);\n}', new_book_btn, content, flags=re.DOTALL)

with open('components/cta.tsx', 'w') as f:
    f.write(content)
