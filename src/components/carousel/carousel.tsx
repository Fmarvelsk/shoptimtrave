import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./carouselBtn";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/router";

type EmbalIProps = {
  slides: Array<any>
}

const EmblaCarousel = ({ slides }: EmbalIProps) => {
  const [viewportRef, embla] = useEmblaCarousel({
    //direction: "rtl",
    skipSnaps: false
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
    <div className="embla relative" >
      <div ref={viewportRef}>
        <div className="embla__container">
          {
            slides.map((index, i) => (
                <div key={i} style={{marginLeft : "2rem", marginTop: -45}} 
                className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
  
                  <img
                    className="lg:object-cover lg:w-full lg:h-full"
                    src={index}
                    alt={i.toString()}
                  />
          
                </div>
            ))}
        </div>
      </div>
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
     
    </div>
  );
};

export default EmblaCarousel;
