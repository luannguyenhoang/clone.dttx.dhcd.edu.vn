import { GET_GIOI_THIEU } from "@/app/api/graphQL/getGioiThieu";
import { GET_TRANG_CHU } from "@/app/api/graphQL/getTrangChu";
import { AboutSection } from "@/app/components/molecules/AboutSection";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { WhyChooseUs } from "@/app/components/molecules/WhyChooseUs";
import { AboutUsPopup } from "@/app/components/organisms/AboutUsPopup";
import { InstructorCarousel } from "@/app/components/organisms/InstructorCarousel";
import { StatisticsCounter } from "@/app/components/organisms/StatisticsCounter";
import { getClient } from "@/lib/apolloClient";

export default async function AboutUs() {
  const [{ data: homeResponse }, { data: gioiThieuResponse }] =
    await Promise.all([
      getClient().query({ query: GET_TRANG_CHU }),
      getClient().query({ query: GET_GIOI_THIEU })
    ]);

  const homeData = homeResponse;
  const gioiThieuData = gioiThieuResponse;

  const TeacherData = homeData?.pageBy?.trangChu?.teacher;
  const whyChooseUsData =
    gioiThieuData?.pageBy?.gioiThieu?.introduce?.whychooseourinstitution;
  const ParameterData = homeData?.pageBy?.trangChu?.parameter;
  const introduce = gioiThieuData?.pageBy?.gioiThieu?.introduce;

  return (
    <>
      <AboutUsPopup />
      <PageBanner
        title={introduce?.title || "Giới thiệu"}
        backgroundImage={
          introduce?.banner?.node?.mediaItemUrl || "/image11.webp"
        }
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          {
            label: introduce?.title || "Giới thiệu"
          }
        ]}
      />
      <AboutSection data={introduce} />
      <WhyChooseUs data={whyChooseUsData} />
      <StatisticsCounter data={ParameterData} />
      <InstructorCarousel data={TeacherData} />
    </>
  );
}
