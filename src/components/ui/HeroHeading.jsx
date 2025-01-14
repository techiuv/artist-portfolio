const HeroHeading = ({ text }) => {
  return (
    <h3 className="text-stroke-1 opacity-50 uppercase font-extrabold md:font-bold text-[11.5vw] md:text-[12vww] lg:text-[11vw] text-gradient-stroke mb-28 tracking-widest	 hero-txt">
      {text}
    </h3>
  );
};

export default HeroHeading;
