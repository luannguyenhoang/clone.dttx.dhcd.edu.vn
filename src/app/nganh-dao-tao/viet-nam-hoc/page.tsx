import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_VIET_NAM_HOC } from "@/app/api/graphQL/getVietNamHoc";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getClient } from "@/lib/apolloClient";

export default async function Page() {
  let courseData = null;
  let nganhHocData = null;

  try {
    const [{ data: courseResponse }, { data: nganhHocResponse }] =
      await Promise.all([
        getClient().query({
          query: GET_VIET_NAM_HOC,
          fetchPolicy: "no-cache"
        }),
        getClient().query({
          query: GET_ALL_NGANH_HOC,
          fetchPolicy: "no-cache"
        })
      ]);

    courseData = courseResponse?.pageBy?.vietNamHoc?.content;
    nganhHocData = nganhHocResponse?.pageBy?.trangChu?.trainingIndustry || {};
  } catch (error) {
    console.error("Error fetching viet-nam-hoc data:", error);
  }

  return (
    <TrainingIndustryDetailLayout
      courseData={courseData}
      nganhHocData={nganhHocData}
    />
  );
}
