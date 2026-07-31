import React, { useRef, useState, useEffect } from "react";
import { useAppVisible } from "./utils";
import Mermaid from "./mermaid";

import { getPage, getTaggedBlocks } from "./query";
import { BlockEntity, PageEntity } from "@logseq/libs/dist/LSPlugin.user"

function App() {
  const [data, setData] = useState<BlockEntity[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);

    async function startFetching() {
      const result = await getTaggedBlocks("domain");
      if (isCurrent) {
        if (result == null) {
          setData(null);
        } else {
          setData(result);
        }
        setLoading(false);
      }
    }

    startFetching();

    // Cleanup logic to prevent race conditions
    return () => {
      isCurrent = false;
    };
  }, []);

  const innerRef = useRef<HTMLDivElement>(null);
  const visible = useAppVisible();
  const code = `
    architecture-beta
        group api(cloud)[API]

        service db(database)[Database] in api
        service disk1(disk)[Storage] in api
        service disk2(disk)[Storage] in api
        service server(server)[Server] in api

        db:L -- R:server
        disk1:T -- B:server
        disk2:T -- B:db
  `;

  if (visible) {
    return (
      <main
        className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <div ref={innerRef} className="text-size-2em overflow-auto h-full">
          Welcome to [[Logseq]] Plugins!
          <pre><code>{JSON.stringify(data?.map((x) => x.title), null, 2)}</code></pre>
          <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
          <Mermaid code={code} />
        </div>
      </main>
    );
  }
  return null;
}

export default App;
