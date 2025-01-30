import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Form from "../components/Form";
import About from "../components/About";
import HeadingText from "../components/ui/HeadingText";
import Title from "../components/shared/Title";
import ProgressBar from "../components/shared/ProgressBar";
import HeroHeading from "../components/ui/HeroHeading";

const Home = () => {
  return (
    <>
      <ProgressBar />
      <Title title="Artist Portfolio - Yuvraj" />
      <header>
        <Navbar />
      </header>

      <main>
        <section
          id="home"
          className="w-[100%] mt-[8vh] md:mt-0  h-auto lg:h-[120vh] relative flex justify-center items-center"
        >
          <div className="mx-auto relative h-full ">
            <img
              src="/img/Firefly 20240729100151 2.png"
              alt="Artist Yuvraj"
              className="hero-img h-full md:h-[100%] mx-auto  aspect-[3/4]    md:aspect-auto  object-cover"
              loading="lazy"
            />
            <div className="bg-gradient-to-b from-transparent to-[#070707] h-32 w-full absolute bottom-0 left-0"></div>
          </div>
          <div className="absolute h-[100%] w-[95%] lg:w-full  mx-auto text-center flex justify-center lg:gap-20 items-center text-transparent top-0 left-1/2 -translate-x-1/2 -z-10">
            <HeroHeading text={"Artist"} />
            <HeroHeading text={"Yuvraj"} />
          </div>
        </section>

        <section id="about" className="w-[100%]">
          <About />
        </section>

        <section id="portfolio" className="w-[100%]">
          <HeadingText heading={"Featured Work"} />

          <div className="w-[90%] md:w-3/4 mx-auto">
            <Cards
              tittle={"Fallen in Love"}
              description={
                "Fallen in Love is a stunning portrayal of a fleeting moment where emotions rise to the surface without words. The eye becomes the storyteller, capturing the intensity of love so deep it dilates the very essence of one's being. The dark, expansive pupil is more than just a biological response; reflecting the sudden rush of emotion when sight meets the beloved."
              }
              year={2024}
              medium={"charcoal"}
              path={
                "/artworks/Yuvraj_Fallen_In_Love_11.7inch×16.5inch_charcoal_2024.jpg"
              }
            />
            <Cards
              tittle={"Ephemeral Life"}
              description={
                "This artwork, rendered in charcoal, captures the fragility of existence through a sculpted hand crumbling at the fingertips into textured fragments. The disintegration symbolizes the inevitable passage of time, highlighting the transient nature of life and the delicate balance between creation and decay. The stark contrast between the solid hand and its dissolving edges evokes a haunting beauty, reminding viewers that even as we strive for permanence, we are bound by the cycle of existence and oblivion—a poignant reflection on mortality and the fleeting nature of being."
              }
              year={2024}
              medium={"charcoal"}
              path={
                "/artworks/Yuvraj_The_End_11.7inch×16.5inch_charcoal_2024.jpg"
              }
            />
            <Cards
              tittle={"Growth"}
              description={
                "This artwork portrays a powerful metaphor for resilience, depicting a tree emerging from a tightly clenched stack of rugged, textured hands. The hands, etched with struggle and strain, symbolize life’s obstacles—struggles, resistance, and the weight of adversity. Yet, from this tension, the tree grows, its roots piercing through the fingers, signifying perseverance and the indomitable spirit of growth. The juxtaposition of the rough, constrained hands against the delicate yet determined tree highlights the beauty of overcoming challenges."
              }
              year={2024}
              medium={"charcoal"}
              path={"/artworks/1000014388.jpg"}
            />
          </div>
        </section>

        <section id="contact" className="w-[100%]">
          <Form />
        </section>
      </main>
    </>
  );
};

export default Home;
