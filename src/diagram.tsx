import React, { useMemo } from "react";
import { renderMermaidSVG } from "beautiful-mermaid";

export default function Diagram({ code }: { code: string }) {
  const { svg, error } = useMemo(() => {
    try {
      return {
        svg: renderMermaidSVG(code, {
          // bg: 'var(--background)',
          // fg: 'var(--foreground)',
          bg: "#1a1b26",
          fg: "#a9b1d6",
          transparent: true,
        }),
        error: null,
      };
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  }, [code]);

  if (error) return <pre>{error.message}</pre>;
  return <div dangerouslySetInnerHTML={{ __html: svg! }} />;
}
