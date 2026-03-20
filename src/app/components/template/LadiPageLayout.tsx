"use client";
import { GET_LADI_PAGE } from "@/app/api/graphQL/getPadiPage";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

interface LadiPageLayoutProps {
  uri: string;
}

export default function LadiPageLayout({ uri }: LadiPageLayoutProps) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pageResponse = await getData(GET_LADI_PAGE, { uri });
        if (!pageResponse) {
          throw new Error("Failed to fetch page data");
        }

        setPageData(pageResponse?.pageBy?.ladiPage?.content);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uri) {
      fetchData();
    }
  }, [uri]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="animate-spin w-16 h-16 border-[4px] border-t-yellow-500 border-l-yellow-500 border-r-transparent border-b-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: pageData || ""
      }}
    />
  );
}
