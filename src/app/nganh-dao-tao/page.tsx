import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import MajorPage from "@/app/components/pages/MajorPage";
import { DEFAULT_DATA_TRANG_CHU } from "@/data/DefaultDataTrangChu";
import { getClient } from "@/lib/apolloClient";

export default async function Page() {
  let nganhHocData = null;
  try {
    const { data } = await getClient().query({
      query: GET_ALL_NGANH_HOC,
      fetchPolicy: "no-cache"
    });

    if (!data || !data.pageBy) {
      throw new Error("No data from GraphQL");
    }

    nganhHocData = data;
  } catch (error) {
    console.error("Error fetching major data:", error);
    nganhHocData = DEFAULT_DATA_TRANG_CHU[0].data;
  }

  return <MajorPage data={nganhHocData} />;
}
