// import { logseq } from "../package.json";
import { BlockEntity, PageEntity } from "@logseq/libs/dist/LSPlugin.user"

// Common
const advancedQuery = async <T>(query: string, ...input: Array<any>): Promise<T | null> => {
  try {
    const result = await logseq.DB.datascriptQuery(query, ...input)
    return result?.flat() as T
  } catch (err) {
    console.warn("Query execution failed:", err)
    return null
  }
}

// Get the UUID matching the page name
export const getPageUuid = async (pageName: string): Promise<PageEntity["uuid"] | null> => {
  const result = await advancedQuery<{ uuid: PageEntity["uuid"] }[]>(`
    [:find (pull ?p [:block/uuid])
     :in $ ?input
     :where
     [?p :block/name ?name]
     [(= ?name ?input)]
     [?p :block/uuid ?uuid]]
     `  , `"${pageName}"`)
  return result?.[0]?.uuid ?? null
}


// Get the content matching the uuid for file-based model (Logseq v0.10.*)
export const getContentFromUuid = async (uuid: BlockEntity["uuid"]): Promise<BlockEntity["content"] | null> => {
  const result = await advancedQuery<{ content: BlockEntity["content"] }[]>(`
    [:find (pull ?p [:block/content])
     :where
     [?p :block/uuid ?uuid]
     [(str ?uuid) ?str]
     [(= ?str "${uuid}")]]
     ` )
  return result?.[0]?.content ?? null
}
