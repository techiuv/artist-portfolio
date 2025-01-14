const About = () => {
  const experience = new Date().getFullYear() - 2021 + " years";

  return (
    <p className="about-para text-center w-[90%] md:w-[70%] lg:w-[65%] mx-auto text-lg md:text-2xl lg:text-3xl text-[#BDBDBD] my-10 md:my-16 font-normal ">
      I am a professional artist based in Bihar with an expertise of{" "}
      {experience} experience specializing in a variety of mediums, including
      charcoal, oil, acrylic, watercolor, and pastels. My artistic journey,
      shaped by self-learning, enabled me to develop a unique and expressive
      style. Each piece I create is crafted with passion, focusing on
      storytelling and evoking emotions in my audience.
    </p>
  );
};

export default About;
