"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FormWrapper } from "@/app/components/molecules/FormWrapper";
import { PageBanner } from "@/app/components/molecules/PageBanner";
import FormPopup from "@/app/components/molecules/FormPopup";

export const Contac = ({ contactData }: { contactData: any }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  const contact = contactData?.pageBy?.lienHe?.contact;

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <PageBanner
        title={contact?.title || "Liên hệ"}
        backgroundImage={"/image11.webp"}
        breadcrumbs={[
          { label: "Trang chủ", url: "/" },
          {
            label: contact?.title || "Liên hệ",
            url: "/lien-he"
          }
        ]}
      />
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#002147] mb-2">
              {contact?.titleAdress || "Thông tin"}
            </h2>
            <div className="h-1 w-20 bg-yellow-400 mb-6 md:mb-8"></div>

            <div className="space-y-4 md:space-y-6 flex flex-col justify-between font-medium text-[#002147]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0">
                  {contact?.address ||
                    "Đại học Công Đoàn - 169 - Tây Sơn - Đống Đa - Hà Nội"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaEnvelope className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0 break-all">
                  {contact?.email || "dhcongdoan@dhcd.edu.vn"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 md:p-6">
                <FaPhone className="text-yellow-500 text-xl mt-1 sm:mt-0 sm:mr-4 min-w-[1.25rem]" />
                <p className="text-sm md:text-base mt-2 sm:mt-0">
                  {contact?.phone || "(84-4) 3.857.3204"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8 mt-8 md:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold text-[#002147] mb-2">
              {contact?.titleForm || "Liên hệ với chúng tôi"}
            </h2>
            <div className="h-1 w-28 bg-yellow-400 mb-6 md:mb-8"></div>

            <FormWrapper type={"form-main"} />
          </div>
        </div>
      </div>
    </>
  );
};
