"use client";

import { useEffect, useState } from "react";
import FormPopup from "@/app/components/molecules/FormPopup";

export const AboutUsPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Set timer to show popup after 12 seconds
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </>
  );
};
