"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface OpenGraphMetaProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image: string;
  locale?: string;
  type?: string;
}

/**
 * Component để đảm bảo OpenGraph meta tags được render đúng trong head
 * Sử dụng khi cần override hoặc ensure OpenGraph tags
 */
export function OpenGraphMeta({
  title,
  description,
  url,
  siteName,
  image,
  locale = "vi_VN",
  type = "website"
}: OpenGraphMetaProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const head = document.head;

    // OpenGraph meta tags cần thiết
    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: image },
      { property: "og:locale", content: locale },
      { property: "og:type", content: type },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title }
    ];

    metaTags.forEach(({ property, content }) => {
      if (!content) return; // Skip empty content

      const existingMeta = head.querySelector(`meta[property="${property}"]`);

      if (existingMeta) {
        // Update existing meta tag
        existingMeta.setAttribute("content", content);
      } else {
        // Create new meta tag
        const metaElement = document.createElement("meta");
        metaElement.setAttribute("property", property);
        metaElement.setAttribute("content", content);
        head.appendChild(metaElement);
      }
    });
  }, [title, description, url, siteName, image, locale, type, pathname]);

  return null;
}
