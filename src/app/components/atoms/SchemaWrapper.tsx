import { getSeoData } from "@/utils/getSeoData";
import { DocumentNode } from "@apollo/client";
import { SchemaJsonLd } from "./SchemaJsonLd";

interface SchemaWrapperProps {
  query: DocumentNode;
  nodeKey: string;
  variables?: Record<string, any>;
}

/**
 * Server component wrapper để lấy schema data và render SchemaJsonLd
 */
export async function SchemaWrapper({
  query,
  nodeKey,
  variables
}: SchemaWrapperProps) {
  try {
    const { seo } = await getSeoData(query, nodeKey, [], variables);

    if (!seo?.fullHead) {
      return null;
    }

    return <SchemaJsonLd fullHead={seo.fullHead} />;
  } catch (error) {
    console.error("Error loading schema data:", error);
    return null;
  }
}
