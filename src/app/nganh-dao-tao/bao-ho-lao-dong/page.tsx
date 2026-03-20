import { GET_ALL_NGANH_HOC } from "@/app/api/graphQL/getAllNganhHoc";
import { GET_BAO_HO_LAO_DONG } from "@/app/api/graphQL/getBaoHoLaoDong";
import { GET_SIDE_BAR } from "@/app/api/graphQL/getSideBar";
import { PageBanner } from "@/app/components/molecules/PageBanner";
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
        query: GET_BAO_HO_LAO_DONG
      }),
      getClient().query({
        query: GET_ALL_NGANH_HOC
      }),
      getClient().query({
        query: GET_SIDE_BAR
      })
    ]);

    courseData = courseResponse?.pageBy?.baoHoLaoDong?.content;
    nganhHocData = nganhHocResponse?.pageBy?.trangChu?.trainingIndustry || {};
    sidebarData =
      sidebarResponse?.allSlideBar?.nodes?.[0]?.sliderBarContent?.sideBar || [];
  } catch (error) {
    console.error("Error fetching bao-ho-lao-dong data:", error);
  }

  const title = courseData?.title || "Đang cập nhật...";
  const bannerUrl = nganhHocData?.banner?.node?.mediaItemUrl || "/image11.webp";

  return (
    <TrainingIndustryDetailLayout
      courseData={courseData}
      nganhHocData={nganhHocData}
      sidebarData={sidebarData}
      banner={
        <PageBanner
          title={title}
          backgroundImage={bannerUrl}
          breadcrumbs={[
            { label: "Trang Chủ", url: "/" },
            { label: "Ngành Đào Tạo", url: "/nganh-dao-tao" },
            { label: title }
          ]}
        />
      }
    />
  );
}
