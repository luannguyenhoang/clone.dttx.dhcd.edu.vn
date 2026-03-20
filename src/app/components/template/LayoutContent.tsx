"use client";

import Header from "@/app/components/molecules/Header";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Footer = dynamic(() =>
  import("@/app/components/molecules/Footer").then((mod) => mod.Footer)
);

export const LayoutContent = ({
  children,
  headerFooterData
}: {
  children: React.ReactNode;
  headerFooterData: any;
}) => {
  const pathname = usePathname();

  const standalonePages = [
    "/tuyen-sinh-nna",
    "/tuyen-sinh-quan-tri-nhan-luc",
    "/tuyen-sinh-cong-tac-xa-hoi",
    "/tuyen-sinh-viet-nam-hoc",
    "/tuyen-sinh-bao-ho-lao-dong",
    "/tuyen-sinh-luan"
  ];

  const isStandalonePage = standalonePages.includes(pathname);

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header data={headerFooterData} />
      <main>{children}</main>
      <Footer data={headerFooterData} />
    </>
  );
};
