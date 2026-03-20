import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_QUAN_TRI_NHAN_LUC } from "@/app/api/graphQL/getQuanTriNhanLuc";
import { GET_SIDE_BAR } from "@/app/api/graphQL/getSideBar";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getClient } from "@/lib/apolloClient";

export default async function Page() {
  let courseData = null;
  let nganhHocData = null;
  let sidebarData = [];

  try {
    const [
      { data: courseResponse },
      { data: nganhHocResponse },
      { data: sidebarResponse }
    ] = await Promise.all([
      getClient().query({
        query: GET_QUAN_TRI_NHAN_LUC,
        fetchPolicy: "no-cache"
      }),
      getClient().query({
        query: GET_ALL_NGANH_HOC,
        fetchPolicy: "no-cache"
      }),
      getClient().query({
        query: GET_SIDE_BAR,
        fetchPolicy: "no-cache"
      })
    ]);

    courseData = courseResponse?.pageBy?.quanTriNhanLuc?.content;
    nganhHocData = nganhHocResponse?.pageBy?.trangChu?.trainingIndustry || {};
    sidebarData =
      sidebarResponse?.allSlideBar?.nodes?.[0]?.sliderBarContent?.sideBar || [];
  } catch (error) {
    console.error("Error fetching quan-tri-nhan-luc data:", error);
  }

  return (
    <TrainingIndustryDetailLayout
      courseData={courseData}
      nganhHocData={nganhHocData}
      sidebarData={sidebarData}
    />
  );
}
