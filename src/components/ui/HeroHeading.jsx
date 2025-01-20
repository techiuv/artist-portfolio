const HeroHeading = ({ text }) => {
  return (
    <h3 className="text-stroke opacity-50 uppercase font-extrabold md:font-bold text-[11.5vw] md:text-[12vww] lg:text-[11vw]  mb-28 tracking-wider	 hero-txt">
      {text}
    </h3>
  );
};

export default HeroHeading;
