import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Cards = ({ path, tittle, year, description, medium }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%", // Adjust based on when you want it to trigger
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <figure
      ref={cardRef}
      className="w-[100%] flex items-center flex-col md:flex-row justify-center gap-4 rounded-3xl bg-secondary-color backdrop-blur-2xl p-3 md:p-6 mt-5 md:mt-10 opacity-0"
    >
      <div className="w-[100%] md:w-[40%] rounded-xl md:rounded-3xl object-cover">
        <img
          src={path}
          alt={tittle}
          loading="lazy"
          className="rounded-xl w-full h-auto"
        />
      </div>

      <figcaption className="w-[100%] md:w-[60%] flex flex-col-reverse lg:flex-col justify-start h-[100%] p-2">
        <div className="w-[100%] text-sm md:text-lg text-white font-light flex items-center justify-start my-2 gap-2 md:gap-4">
          <p className="rounded-2xl md:rounded-3xl bg-[#383838] px-3 py-1 text-center font-normal text-sm">
            {medium}
          </p>
          <p className="bg-primary-color px-3 py-1 text-center font-normal text-sm rounded-2xl md:rounded-3xl">
            {year}
          </p>
        </div>

        <div className="w-[100%]">
          <h2 className="font-bold text-3xl my-3 uppercase">{tittle}</h2>
          <p className="text-lg md:text-xl lg:text-2xl my-2 text-[#BDBDBD] font-normal">
            {description}
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default Cards;
