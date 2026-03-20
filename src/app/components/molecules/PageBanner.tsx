import ChevronIcon from "@/icons/ChevronIcon";
import Link from "next/link";
import Image from "next/image";

interface PageBannerProps {
  title: string;
  breadcrumbs?: Array<{ label: string; url?: string }>;
  backgroundImage?: string;
}

export const PageBanner = ({
  title,
  breadcrumbs,
  backgroundImage
}: PageBannerProps) => {
  return (
    <div className="relative w-full h-[250px] text-white overflow-hidden">
      <Image
        src={backgroundImage || "/image11.webp"}
        alt={title}
        fill
        priority
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1440px"
        className="object-cover"
        quality={75}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col items-start justify-center h-full px-4">
        <div className="text-start z-10 lg:px-0 px-4">
          <h1 className="text-4xl  mx-auto md:text-5xl font-bold mb-4 z-10">
            {title}
          </h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-start justify-start text-sm">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronIcon />}
                  {item.url ? (
                    <Link
                      href={item.url}
                      className="text-white hover:text-yellow-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={index === 0 ? "text-white" : "text-yellow-400"}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
