import {
  GET_CONTENT_LICH_KHAI_GIANG,
  GET_LICH_KHAI_GIANG
} from "@/app/api/graphQL/getLichKhaiGiang";
import { CountdownTimer } from "@/app/components/molecules/CountdownTimer";
import { FormWrapper } from "@/app/components/molecules/FormWrapper";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { getClient } from "@/lib/apolloClient";

export default async function LichKhaiGiang() {
  let eventData = {
    title: "",
    date: ""
  };
  let content = {
    title: "",
    title2: "",
    item: "",
    description: ""
  };

  try {
    const [{ data: eventResponse }, { data: contentResponse }] =
      await Promise.all([
        getClient().query({
          query: GET_LICH_KHAI_GIANG
        }),
        getClient().query({
          query: GET_CONTENT_LICH_KHAI_GIANG
        })
      ]);

    if (eventResponse?.pageBy?.trangChu?.openingschedule) {
      eventData = eventResponse.pageBy.trangChu.openingschedule;
    }
    if (contentResponse?.pageBy?.lichKhaiGiang?.content) {
      content = contentResponse.pageBy.lichKhaiGiang.content;
    }
  } catch (error) {
    console.error("Error fetching event data:", error);
  }

  return (
    <>
      <PageBanner
        title="Lịch khai giảng"
        backgroundImage="/image11.webp"
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: "Lịch khai giảng" }
        ]}
      />

      <CountdownTimer title={eventData.title} date={eventData.date} />
      <div className="h-fit bg-white px-6 py-10 md:px-20 md:py-16">
        <div className="pb-10">
          <h1 className="text-[#002147] lg:text-3xl md:text-2xl text-xl font-bold uppercase mb-4 text-center">
            {content.title2}
          </h1>
          <h2 className="text-xl md:text-2xl text-[#002147] font-semibold mb-6 text-center">
            {content.description}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <ul className="space-y-3 text-gray-800">
              {content.item &&
                content.item
                  .split("\r\n")
                  .map((item: string, index: number) => (
                    <li key={index} className="flex">
                      <span className="text-yellow-500 mr-2">✓</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
            </ul>
          </div>

          <div>
            <h1 className="text-blue-900 text-xl md:text-3xl font-medium mb-4 text-center">
              Đăng ký để nhận tư vấn
            </h1>
            <FormWrapper type="form-main" />
          </div>
        </div>
      </div>
    </>
  );
}
