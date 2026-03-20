import { replaceSeoRM } from "@/utils/seoRankMath";
import { Metadata } from "next";

export function extractMetaContent(fullHead: string, key: string): string {
  if (key === "application/ld+json") {
    const scriptRegex =
      /<script[^>]+?type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
    const scriptMatch = fullHead.match(scriptRegex);
    return scriptMatch ? scriptMatch[1].trim() : "";
  }
  const metaRegex = new RegExp(
    `<meta[^>]+?(?:property|name)=["']${key}["'][^>]+?content=["']([^"']+)["']|<link[^>]+?rel=["']${key}["'][^>]+?href=["']([^"']+)["']`,
    "i"
  );
  const metaMatch = fullHead.match(metaRegex);
  return metaMatch ? metaMatch[1] || metaMatch[2] || "" : "";
}

export function generateMetadataFromFullHead(
  fullHead: string,
  focusKeywords: string
): Metadata {
  const cleanedFullHead = replaceSeoRM(fullHead);

  // Fallback values cho website trường đại học
  const defaultTitle = "Trường Đại học Thành phố Hồ Chí Minh - DHCĐ TPHCM";
  const defaultDescription =
    "Trường Đại học Thành phố Hồ Chí Minh - Cơ sở giáo dục đại học uy tín, chất lượng hàng đầu tại Việt Nam.";
  const defaultSiteName = "Trường Đại học Thành phố Hồ Chí Minh";
  const defaultUrl = "https://dttx.dhcd.edu.vn";
  const defaultImage = "https://dttx.dhcd.edu.vn/logo.png";

  // Extract content with fallbacks
  const ogTitle =
    extractMetaContent(cleanedFullHead, "og:title") || defaultTitle;
  const ogDescription =
    extractMetaContent(cleanedFullHead, "og:description") ||
    extractMetaContent(cleanedFullHead, "description") ||
    defaultDescription;
  const ogUrl = extractMetaContent(cleanedFullHead, "og:url") || defaultUrl;
  const ogImage =
    extractMetaContent(cleanedFullHead, "og:image") || defaultImage;
  const ogSiteName =
    extractMetaContent(cleanedFullHead, "og:site_name") || defaultSiteName;

  // Determine type based on content
  const publishedTime = extractMetaContent(
    cleanedFullHead,
    "article:published_time"
  );
  const section = extractMetaContent(cleanedFullHead, "article:section");
  const ogType =
    extractMetaContent(cleanedFullHead, "og:type") ||
    (publishedTime ? "article" : "website");

  // Base OpenGraph object
  const baseOpenGraph = {
    title: ogTitle,
    description: ogDescription,
    url: ogUrl,
    siteName: ogSiteName,
    locale: extractMetaContent(cleanedFullHead, "og:locale") || "vi_VN",
    images: [
      {
        url: ogImage,
        width: parseInt(
          extractMetaContent(cleanedFullHead, "og:image:width") || "1200"
        ),
        height: parseInt(
          extractMetaContent(cleanedFullHead, "og:image:height") || "630"
        ),
        alt: extractMetaContent(cleanedFullHead, "og:image:alt") || ogTitle,
        type:
          extractMetaContent(cleanedFullHead, "og:image:type") || "image/png"
      }
    ]
  };

  // Add article-specific properties if it's an article
  const openGraphData =
    ogType === "article"
      ? {
          ...baseOpenGraph,
          type: "article" as const,
          publishedTime,
          section
        }
      : {
          ...baseOpenGraph,
          type: "website" as const
        };

  return {
    title: ogTitle,
    keywords: focusKeywords || "đại học, giáo dục, đào tạo, TPHCM",
    description: ogDescription,
    robots: extractMetaContent(cleanedFullHead, "robots") || "index, follow",
    alternates: {
      canonical: extractMetaContent(cleanedFullHead, "canonical") || ogUrl
    },
    openGraph: openGraphData,
    twitter: {
      card:
        (extractMetaContent(cleanedFullHead, "twitter:card") as
          | "summary"
          | "summary_large_image"
          | "player"
          | "app") || "summary_large_image",
      title: extractMetaContent(cleanedFullHead, "twitter:title") || ogTitle,
      description:
        extractMetaContent(cleanedFullHead, "twitter:description") ||
        ogDescription,
      site: extractMetaContent(cleanedFullHead, "twitter:site") || "@dttx_dhcd",
      creator:
        extractMetaContent(cleanedFullHead, "twitter:creator") || "@dttx_dhcd",
      images: [extractMetaContent(cleanedFullHead, "twitter:image") || ogImage]
    }
  };
}
