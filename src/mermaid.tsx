import React, { useState, useEffect } from "react";
import mermaid from "mermaid";

/*
 * Method 2: Use mermaid.render() to get SVG and inject it.
 * This generates the diagram code explicitly.
 */
export default function Mermaid({ code }: { code: string }) {
  const [svgCode, setSvgCode] = useState("");
  useEffect(() => {
    let isMounted = true; // to avoid state updates on unmounted component
    async function renderChart() {
      try {
        await mermaid.parse(code); // optional: validate the graph
        const { svg } = await mermaid.render("uniqueChartId", code);
        if (isMounted) {
          setSvgCode(svg);
        }
      } catch (error) {
        console.error("Error rendering Mermaid chart:", error);
      }
    }
    renderChart();
    return () => {
      isMounted = false;
    };
  }, [code]);
  // Render the SVG string directly into the DOM
  return <div dangerouslySetInnerHTML={{ __html: svgCode }} />;
}
