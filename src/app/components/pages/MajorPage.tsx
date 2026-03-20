"use client";

import { CourseCard } from "@/app/components/atoms/CourseCard";
import FormPopup from "@/app/components/molecules/FormPopup";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import { SliderBar } from "@/app/components/organisms/SliderBar";
import DefaultLayout from "@/app/components/template/LayoutDefault";
import { IndustryGroup } from "@/types/types";
import { toSlug } from "@/utils/toSlug";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface MajorPageProps {
  data: any;
}

export default function MajorPage({ data }: MajorPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const nganhHoc = useMemo(
    () => data?.pageBy?.trangChu?.trainingIndustry || {},
    [data]
  );

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  const industryGroups: IndustryGroup[] = useMemo(
    () => nganhHoc?.industrygroups || [],
    [nganhHoc]
  );

  const filteredIndustryGroups = useMemo(() => {
    const normalizeText = (text: string = "") => {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^\w\s]/gi, "")
        .trim();
    };

    if (searchTerm === "") return industryGroups;

    const normalizedSearchTerm = normalizeText(searchTerm);
    return industryGroups.filter((industry) => {
      const normalizedName = normalizeText(industry.industryname || "");
      const normalizedDesc = normalizeText(industry.description || "");
      return (
        normalizedName.includes(normalizedSearchTerm) ||
        normalizedDesc.includes(normalizedSearchTerm)
      );
    });
  }, [searchTerm, industryGroups]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={nganhHoc?.title || "Ngành đào tạo"}
        backgroundImage={nganhHoc?.banner?.node?.mediaItemUrl}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          { label: nganhHoc?.title || "Ngành đào tạo" }
        ]}
      />

      <div className="py-24">
        <DefaultLayout>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 lg:px-0">
              <div className="flex flex-col gap-4">
                {searchTerm && (
                  <div className="mb-4 p-4 bg-gray-50 flex justify-between rounded-md border border-gray-200">
                    <p className="text-gray-700">
                      {filteredIndustryGroups.length > 0
                        ? `Tìm thấy ${filteredIndustryGroups.length} ngành học phù hợp với từ khóa "${searchTerm}"`
                        : `Không tìm thấy ngành học nào phù hợp với từ khóa "${searchTerm}"`}
                    </p>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      onClick={clearSearch}
                      aria-label="Xóa kết quả tìm kiếm"
                    >
                      <FaTimes size={12} /> Xóa tìm kiếm
                    </button>
                  </div>
                )}
                <h2 className="sr-only">Danh sách các ngành đào tạo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                  {filteredIndustryGroups.map(
                    (industry: IndustryGroup, index: number) => (
                      <CourseCard
                        key={index}
                        title={industry.industryname || ""}
                        desc={industry.description || ""}
                        image={industry.image?.node?.mediaItemUrl || ""}
                        path={`/nganh-dao-tao/${toSlug(industry.industryname || "")}`}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="sidebar-posts lg:col-span-3">
              <SliderBar
                showCustomSearch={true}
                onSearch={handleSearch}
                showVideoMajorDetail={false}
                showAllMajor={false}
                showRegister={false}
                showForm={true}
                showNewPost={false}
              />
            </div>
          </div>
        </DefaultLayout>
      </div>
    </>
  );
}
