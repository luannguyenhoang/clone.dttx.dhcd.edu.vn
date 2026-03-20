"use client";

import HeaderMenu from "@/app/components/molecules/HeaderMenu";
import HeaderTop from "@/app/components/molecules/HeaderTop";
export default function Header({ data }: { data: any }) {
  const headerData = data?.pageBy?.trangChu?.header;

  return (
    <>
      <HeaderTop headerData={headerData} />
      <HeaderMenu headerData={headerData} />
    </>
  );
}
