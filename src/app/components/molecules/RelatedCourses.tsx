"use client";

import { CourseCard } from "@/app/components/atoms/CourseCard";
import { IndustryGroup } from "@/types/types";
import { toSlug } from "@/utils/toSlug";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const RelatedCourses = ({ data }: { data: IndustryGroup[] }) => {
  const swiperRef = useRef(null);

  // Nếu không có dữ liệu, không render gì cả
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="relative" aria-labelledby="related-courses-title">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center bg-white p-4 my-5">
          <h2
            id="related-courses-title"
            className="text-2xl font-medium text-[#002147]"
          >
            Các ngành đào tạo
          </h2>
          <div className="flex gap-2" aria-label="Điều hướng ngành đào tạo">
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slidePrev()}
              aria-label="Ngành đào tạo trước"
            >
              <FaChevronLeft />
            </button>
            <button
              className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white rounded-sm"
              onClick={() => (swiperRef.current as any)?.slideNext()}
              aria-label="Ngành đào tạo tiếp theo"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            (swiperRef as any).current = swiper;
          }}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }}
          className="instructor-swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <CourseCard
                title={item?.industryname || ""}
                desc={item?.description || ""}
                image={item?.image?.node?.mediaItemUrl || "#"}
                path={`/nganh-dao-tao/${toSlug(item?.industryname || "")}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
