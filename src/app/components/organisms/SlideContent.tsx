"use client";

import Image from "next/image";
import Link from "next/link";

const SlideContent = ({
  slide,
  index,
  currentSlide,
  prevSlide,
  isTransitioning,
  isAnimating
}: any) => {
  return (
    <div
      key={index}
      className={`absolute inset-0 slide-transition ${
        index === currentSlide ? "z-20" : "z-10"
      } ${
        index === currentSlide
          ? "opacity-100"
          : index === prevSlide && isTransitioning
            ? "opacity-0"
            : "opacity-0"
      }`}
    >
      {/* Optimized Image with priority for the first slide */}
      <div className="absolute inset-0">
        <Image
          src={slide.image || "/no-image.jpeg"}
          alt={slide.title}
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative max-w-6xl mx-auto h-full flex flex-col items-center lg:items-start justify-center text-white px-4">
        <div className="max-w-lg text-center lg:text-start mb-8">
          <h1
            className={`text-3xl lg:text-4xl font-bold mb-4 px-4 lg:px-0 title-animation ${
              isAnimating && index === currentSlide ? "animate" : ""
            }`}
          >
            {slide.title}
          </h1>
          <p
            className={`text-sm lg:text-lg text-gray-300 px-4 lg:px-0 desc-animation ${
              isAnimating && index === currentSlide ? "animate" : ""
            }`}
          >
            {slide.description}
          </p>
          <Link href={slide.link || "/"}>
            <button
              className={`mt-6 bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 uppercase btn-animation ${
                isAnimating && index === currentSlide ? "animate" : ""
              }`}
              aria-label={`Xem ngay: ${slide.title}`}
            >
              Xem ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
