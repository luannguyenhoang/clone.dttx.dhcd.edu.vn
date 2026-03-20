import HomePage from "@/app/components/pages/HomePage";
import { DEFAULT_DATA_TRANG_CHU } from "@/data/DefaultDataTrangChu";
import { getClient } from "@/lib/apolloClient";
import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_TRANG_CHU } from "./api/graphQL/getTrangChu";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_TRANG_CHU, "pageBy");
  const fullHead =
    seo?.fullHead || DEFAULT_DATA_TRANG_CHU[0].data.pageBy.seo.fullHead;
  const focusKeywords = seo?.focusKeywords || "";

  return {
    ...generateMetadataFromFullHead(fullHead, focusKeywords),
    robots: "index, follow"
  };
}

export default async function Home() {
  let homeData = null;
  try {
    const { data } = await getClient().query({
      query: GET_TRANG_CHU,
      fetchPolicy: "no-cache"
    });

    if (!data || !data.pageBy) {
      throw new Error("No homepage data from GraphQL");
    }

    homeData = data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    homeData = DEFAULT_DATA_TRANG_CHU[0].data;
  }

  return <HomePage data={homeData} />;
}
