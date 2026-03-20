"use client";

import { useEffect, useState } from "react";
import FormPopup from "../molecules/FormPopup";

export default function ClientSidePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimerId = setTimeout(() => {
      setShowPopup(true);
    }, 12000);

    return () => {
      clearTimeout(popupTimerId);
    };
  }, []);

  if (!showPopup) return null;

  return <FormPopup showPopup={showPopup} setShowPopup={setShowPopup} />;
}
