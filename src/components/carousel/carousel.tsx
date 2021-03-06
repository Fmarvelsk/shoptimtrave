import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./carouselBtn";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/router";

type EmbalIProps = {
  slides: Array<any>;
};

const EmblaCarousel = ({ slides }: EmbalIProps) => {
  const [viewportRef, embla] = useEmblaCarousel({
    //direction: "rtl",
    skipSnaps: false,
  });
  const {
    query: { slug },
  } = useRouter();

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div ref={viewportRef} className="embla relative">
      <div className="embla__container">
        {slides.map((index, i) => (
          <div
            key={i}
            style={{ marginLeft: "2rem" }}
            className="flex-shrink-0 flex justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden"
          >
            <img
              className="lg:object-cover lg:w-full lg:h-full"
              src={
                index || "/assets/placeholder/products/product-thumbnail.svg"
              }
              alt={i.toString() + slug?.toString()}
            />
          </div>
        ))}
      </div>

      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
    </div>
  );
};

export default EmblaCarousel;
