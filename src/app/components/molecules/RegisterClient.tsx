"use client";

import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { VideoModal } from "./VideoModal";
import FormPopup from "./FormPopup";

interface SidebarItem {
  icon: string;
  text: string;
}

interface RegisterClientProps {
  sidebarItems: SidebarItem[];
  video: any;
}

export const RegisterClient = ({
  sidebarItems,
  video
}: RegisterClientProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const topItems = sidebarItems.slice(0, 3);
  const bottomItems = sidebarItems.slice(3);

  return (
    <div className="mb-8 border border-gray-200 py-5 px-5">
      <div className="mb-8 relative border border-gray-200 py-12 px-5">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${video?.image?.node?.mediaItemUrl || "/"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />

        <div className="relative z-20 text-center text-white max-w-3xl px-4">
          <div className="group w-fit mx-auto">
            <button
              className="w-14 h-14 rounded-full group-hover:border-[#fdc800] flex items-center justify-center border-2 border-white transition-all duration-300 mx-auto"
              onClick={openModal}
              aria-label="Xem video giới thiệu ngành học"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <FaPlay
                  className="text-[#fdc800] group-hover:text-white ml-1 transition-all duration-300"
                  size={20}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={showModal}
        onClose={closeModal}
        videoId={video?.idVideo}
        title={"Video Tour"}
      />
      <div>
        {topItems.length > 0 && (
          <div className="flex flex-col gap-1 mb-4">
            {topItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-1.5 ${
                  index !== topItems.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg mr-1">{item.icon}</span>
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>{" "}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 my-4">
          <button
            onClick={() => setShowPopup(true)}
            className="w-full py-3 px-4 bg-[#007c64] text-white font-semibold uppercase rounded-full"
          >
            Tư vấn ngành
          </button>
        </div>

        {bottomItems.length > 0 && (
          <div className="flex flex-col gap-1 mt-3">
            {bottomItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-1.5 ${
                  index !== bottomItems.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg mr-1">{item.icon}</span>
                </div>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {mounted && showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </div>
  );
};
