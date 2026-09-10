import { graph, type JsonLd } from '@/lib/schema';

/**
 * Server component. Emits one <script type="application/ld+json"> with an @graph.
 * planning/docs/06. Hand-authored, injected server-side, no plugin.
 */
export function Schema({ nodes }: { nodes: JsonLd[] }) {
  const json = JSON.stringify(graph(nodes));
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape < to be defensive against </script>.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
    />
  );
}
