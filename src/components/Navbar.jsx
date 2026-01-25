import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
const navItems = ["Nexus", "Prologue", "About", "Contact"];

export default function Navbar() {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);
  useEffect(() => {
    const prevScrollY = lastScrollY.current;
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > prevScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < prevScrollY) {
      navContainerRef.current.classList.add("floating-nav");
      setIsNavVisible(true);
    }
    lastScrollY.current = currentScrollY;
  }, [currentScrollY, lastScrollY]);
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);
  return (
    <div
      className="fixed top-4 left-0 right-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 inset-x-0"
      ref={navContainerRef}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a className="nav-hover-btn">{item}</a>
              ))}
            </div>
            {/* button to play audio */}
            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                ></div>
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
