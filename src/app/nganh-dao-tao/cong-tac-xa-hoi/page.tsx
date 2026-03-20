import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_CONG_TAC_XA_HOI } from "@/app/api/graphQL/getCongTacXaHoi";
import TrainingIndustryDetailLayout from "@/app/components/template/LayoutTrainingIndustryDetail";
import { getClient } from "@/lib/apolloClient";

export default async function Page() {
  let courseData = null;
  let nganhHocData = null;

  try {
    const [{ data: courseResponse }, { data: nganhHocResponse }] =
      await Promise.all([
        getClient().query({
          query: GET_CONG_TAC_XA_HOI,
          fetchPolicy: "no-cache"
        }),
        getClient().query({
          query: GET_ALL_NGANH_HOC,
          fetchPolicy: "no-cache"
        })
      ]);

    courseData = courseResponse?.pageBy?.congTacXaHoi?.content;
    nganhHocData = nganhHocResponse?.pageBy?.trangChu?.trainingIndustry || {};
  } catch (error) {
    console.error("Error fetching cong-tac-xa-hoi data:", error);
  }

  return (
    <TrainingIndustryDetailLayout
      courseData={courseData}
      nganhHocData={nganhHocData}
    />
  );
}
