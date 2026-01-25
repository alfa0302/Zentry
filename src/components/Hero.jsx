import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  gsap.registerPlugin(ScrollTrigger);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  // const nextVideoRef = useRef(null);
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { opacity: 1 });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          // onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-screen w-screen overflow-x-hidden overflow-y-hidden">
      {isLoading && (
        <div className="flex items-center justify-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 w-screen h-screen rounded-lg bg-blue-75 overflow-hidden"
      >
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer">
          <div
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 h-full"
            onClick={handleMiniVdClick}
          >
            <video
              // ref={nextVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              autoPlay
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center "
              onCanPlayThrough={handleVideoLoad}
            />
          </div>
        </div>
        <video
          loop
          muted
          autoPlay
          src={getVideoSrc(currentIndex)}
          // ref={nextVideoRef}
          id="next-video"
          className="absolute-center opacity-0 z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
        <video
          src={getVideoSrc(currentIndex)}
          autoPlay
          muted
          loop
          className="absolute left-0 top-0 object-cover object-center outervideo"
          onLoadedData={handleVideoLoad}
        />
        <h1 className="special-font hero-heading absolute bottom-5 mb-20 right-5 z-40 zentry text-blue-75">
          Gaming
        </h1>
      </div>
      <div className="absolute left-0 top-0 z-40">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100 uppercase zentry">
            redefine
          </h1>
          <p className="mb-5 max-w-64 robert-regular text-blue-100">
            Enter the Metagame Layer <br /> Unleash the Play Economy
          </p>
          <Button
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex justify-center items-center zentry gap-1"
          />
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 mb-20 right-5 zentry text-black">
        Gaming
      </h1>
    </div>
  );
}
