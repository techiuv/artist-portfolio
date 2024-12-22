import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './component/Navbar';
import Cards from './component/Cards';
import Form from './component/Form';
import './App.css';

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline()

function App() {

  useGSAP(() => {


    
    tl.from(".hero-txt, .text-stroke-1", {
       opacity: 0,
       duration: .5,
     });

    tl.from(".hero-img", {
      opacity: 0,
      duration: .5,
    })

    gsap.from(".about-para", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        start: 'top 90%',
        end: "bottom 90%",
        scrub: 1,
        trigger: '#about',
      },
    });

    

  })

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
          glowText.style.textShadow = "0px 0px 30px #FF7B00";
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

  const experience = new Date().getFullYear() - 2021 + ' years';

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section id='home' className='w-[100%] mt-[5vh] md:mt-[10vh] h-auto lg:h-[100vh] relative flex justify-center items-center'>
          <div className='mx-auto relative w-[100%] lg:w-auto h-[100%]'>
            <img
              src="/img/Firefly 20240729100151 2.png"
              alt="Artist Yuvraj"
              className='hero-img h-auto md:h-[100%] mx-auto aspect-[3/4] md:aspect-auto object-cover'
            />
            <div className="bg-gradient-to-b from-transparent to-[#070707] h-32 w-full absolute bottom-0 left-0"></div>
          </div>
          <div className='absolute h-[100%] w-[95%] bg-red-50 mx-auto text-center flex justify-center lg:gap-20 items-center text-transparent top-0 left-1/2 -translate-x-1/2 -z-10'>
            <h3 className='text-stroke-1 opacity-50 uppercase font-extrabold md:font-bold text-[10vw] md:text-[11vww] lg:text-[11.5vw] text-gradient-stroke mb-28 tracking-widest hero-txt'>Artist</h3>
            <h3 className='text-stroke-1 opacity-50 uppercase font-extrabold md:font-bold text-[10vw] md:text-[11vww] lg:text-[11.5vw] text-gradient-stroke mb-28 tracking-widest hero-txt'>Yuvraj</h3>
          </div>
        </section>

        <section id='about' className='w-[100%]'>
          <p className='about-para text-center w-[90%] md:w-[70%] lg:w-[65%] mx-auto text-lg md:text-2xl lg:text-3xl text-[#BDBDBD] my-10 md:my-16 font-normal ' >
            I am a professional artist based in Bihar with an expertise of {experience} experience specializing in a variety of mediums, including charcoal, oil, acrylic, watercolor, and pastels. My artistic journey, shaped by self-learning, enabled me to develop a unique and expressive style. Each piece I create is crafted with passion, focusing on storytelling and evoking emotions in my audience.
          </p>
        </section>

        <section id='portfolio' className='w-[100%]'>
          <h3 className='text-center mx-auto text-[10vw] lg:text-[7rem] font-bold drop-shadow-md uppercase heading transition-all duration-700' ref={headingRef} >Featured Work</h3>

          <div className='w-[90%] md:w-3/4 mx-auto'>
            <Cards
              tittle={'Fallen in Love'}
              description={"Fallen in Love is a stunning portrayal of a fleeting moment where emotions rise to the surface without words. The eye becomes the storyteller, capturing the intensity of love so deep it dilates the very essence of one's being. The dark, expansive pupil is more than just a biological response; reflecting the sudden rush of emotion when sight meets the beloved."}
              year={2024}
              medium={'charcoal'}
              path={'/artworks/Yuvraj_Fallen_In_Love_11.7inch×16.5inch_charcoal_2024.jpg'}
            />
            <Cards
              tittle={'Ephemeral Life'}
              description={'This artwork depicts a realistic hand sculpted in charcoal, seemingly deteriorating as the top part of the fingers disintegrates into small, textured fragments. The concept highlights the inevitable truth that every birth leads to a deadline, capturing the fragile balance between existence and oblivion.'}
              year={2024}
              medium={'charcoal'}
              path={'/artworks/Yuvraj_The_End_11.7inch×16.5inch_charcoal_2024.jpg'}
            />
            <Cards
              tittle={'Growth'}
              description={"This artwork shows a tree growing from a tightly clenched stack of rugged, textured hands, symbolizing life's obstacles such as struggles and resistance. Despite these challenges, the tree emerges with resilience, its roots piercing through the fingers, representing the unstoppable spirit of growth."}
              year={2024}
              medium={'charcoal'}
              path={'/artworks/1000014388.jpg'}
            />
          </div>
        </section>

        <section id='contact' className='w-[100%]'>
          <Form />
        </section>
      </main>
    </>
  );
}

export default App;
