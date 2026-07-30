import React, { useRef } from "react";
import { useAppVisible } from "./utils";
import Mermaid from "./mermaid";

function App() {
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
        <div ref={innerRef} className="text-size-2em">
          Welcome to [[Logseq]] Plugins!
          <Mermaid code={code} />
        </div>
      </main>
    );
  }
  return null;
}

export default App;
