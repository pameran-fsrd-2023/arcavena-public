// import { useState, useEffect } from "react";

const ScrollShiny = ({ children }: { children: React.ReactNode }) => {
  // const [scrollY, setScrollY] = useState(0);
  // const [scrollDistance, setScrollDistance] = useState(0);
  // const [blurIntensity, setBlurIntensity] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     setScrollY(currentScrollY);
  //     setScrollDistance(Math.abs(currentScrollY - scrollY));
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollY]);

  // useEffect(() => {
  //   if (scrollDistance > 3) {
  //     setBlurIntensity(30); // Start blurring if scroll distance exceeds the threshold
  //   } else {
  //     setBlurIntensity(0); // Reset blurring if scroll distance is below the threshold
  //   }
  // }, [scrollDistance]);

  // const foregroundStyle = {
  //   zIndex: 2,
  // };

  // const backgroundStyle = {
  //   zIndex: 1,
  //   filter: `blur(${blurIntensity}px)`, // Apply blur effect to the background component
  // };

  return (
    <div className="relative h-auto w-full">
      <div className="absolute inset-0 h-auto w-full duration-500 ease-in">
        {children}
      </div>
      {/* <div className="absolute inset-0 w-full h-auto duration-500 ease-in delay-150" style={backgroundStyle}>
        {children}
      </div>
      <div className="absolute inset-0 w-full h-auto duration-500 ease-in delay-300" style={backgroundStyle}>
        {children}
      </div>
      <div className="absolute inset-0 w-full h-auto duration-500 ease-in" style={foregroundStyle}>
        {children}
      </div> */}
    </div>
  );
};

export default ScrollShiny;
