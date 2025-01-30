import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.from(".about-para", {
      opacity: .1,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        start: "top 90%",
        end: "bottom 60%",
        y: 100,
        scrub: 1,
        trigger: "#about",
        markers: false,
      },
    });
  });

  const experience = new Date().getFullYear() - 2021 + " years";

  return (
    <p className="about-para text-center w-[90%] md:w-[70%] lg:w-[65%] mx-auto text-lg md:text-2xl lg:text-3xl text-[#BDBDBD] my-10 md:my-16 font-normal ">
      I am a <span className="text-neutral-200 ">professional artist</span>{" "}
      based in Bihar with an expertise of{" "}
      <span className="text-neutral-200 ">{experience} experience</span>{" "}
      specializing in a variety of mediums, including charcoal, oil, acrylic,
      watercolor, and pastels. My artistic journey, shaped by self-learning,
      enabled me to develop a unique and expressive style. Each piece I create
      is crafted with passion, focusing on storytelling and evoking emotions in
      my audience.
    </p>
  );
};

export default About;
