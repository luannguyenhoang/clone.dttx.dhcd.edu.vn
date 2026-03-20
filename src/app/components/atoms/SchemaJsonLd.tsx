"use client";

import { extractMetaContent } from "@/utils/seoUtils";
import { replaceSeoRM } from "@/utils/seoRankMath";

interface SchemaJsonLdProps {
  fullHead: string;
}

/**
 * Component để render Schema.org JSON-LD data từ fullHead GraphQL
 * Giải quyết vấn đề "No Schema.org data found on the page"
 */
export function SchemaJsonLd({ fullHead }: SchemaJsonLdProps) {
  if (!fullHead) return null;

  const cleanedFullHead = replaceSeoRM(fullHead);
  const schemaData = extractMetaContent(cleanedFullHead, "application/ld+json");

  if (!schemaData) return null;

  try {
    // Validate JSON trước khi render
    JSON.parse(schemaData);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaData
        }}
      />
    );
  } catch (error) {
    console.error("Invalid JSON-LD schema data:", error);
    return null;
  }
}
