import { useEffect, useRef } from "react";

const HeadingText = ({ heading }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const glowText = headingRef.current;

    const observerOptions = {
      root: null, // Observes the viewport
      threshold: 0.5, // Trigger when 50% of the text is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply glowing text shadow effect
          glowText.style.textShadow = "0px 0px 50px #FF7B00";
        } else {
          glowText.style.textShadow = "0px 0px 30px transparent";
        }
      });
    }, observerOptions);

    if (glowText) {
      observer.observe(glowText);
    }

    return () => {
      if (glowText) observer.unobserve(glowText);
    };
  }, []);

  return (
    <h3
      className="text-center mx-auto text-[10vw] lg:text-[7rem] font-bold drop-shadow-md uppercase heading transition-all duration-700"
      ref={headingRef}
    >
      {heading}
    </h3>
  );
};

export default HeadingText;
