import { apolloClient } from "@/lib/getData";
import { SeoData } from "@/types/types";
import { DocumentNode } from "@apollo/client";

/**
 * @param query
 * @param nodeKey
 * @param extraData
 * @param variables
 * @returns
 */
export async function getSeoData(
  query: DocumentNode,
  nodeKey: string,
  extraData: string[] = [],
  variables?: Record<string, any>
): Promise<SeoData> {
  try {
    const response = await apolloClient.query({
      query,
      variables,
      fetchPolicy: "network-only" as any
    });
    let nodeData = response?.data?.[nodeKey] || {};

    const result: SeoData = {
      seo: nodeData?.seo || {}
    };

    if (extraData.length > 0) {
      extraData.forEach((key) => {
        if (nodeData[key]) {
          result[key] = nodeData[key];
        }
      });
    }

    return result;
  } catch (error) {
    console.error("GraphQL SEO Error:", error);
    return {
      seo: {}
    };
  }
}
