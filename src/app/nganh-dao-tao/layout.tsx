import { GET_SEO_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { DEFAULT_DATA_NGANH_DAO_TAO } from "@/data/DefaultDataNganhDaoTao";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_ALL_NGANH_HOC, "pageBy");
  const fullHead =
    seo?.fullHead || DEFAULT_DATA_NGANH_DAO_TAO[0].data.pageBy.seo.fullHead;
  const focusKeywords = seo?.focusKeywords || "";

  return {
    ...generateMetadataFromFullHead(fullHead, focusKeywords),
    robots: "index, follow"
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
