function cursorEffect() {
    const page1 = document.getElementById("home");
    const cursor = document.getElementById("cursor");
    //const aboutSection = document.getElementById("about");
    // const page1Btn = document.getElementById("about-navigation-btn");
    function applyCursorEffect() {
        // Apply cursor effects only if the screen width is 1024px or more
        if (window.innerWidth >= 1024) {
            page1.addEventListener("mousemove", handleMouseMove);
            page1.addEventListener("mouseenter", handleMouseEnter);
            page1.addEventListener("mouseleave", handleMouseLeave);
       
            
        } else {
            gsap.to(cursor, { opacity: 0, display: "none" });
            // Clean up event listeners if the width is less than 1024px
            page1.removeEventListener("mousemove", handleMouseMove);
            page1.removeEventListener("mouseenter", handleMouseEnter);
            page1.removeEventListener("mouseleave", handleMouseLeave);
            
        }
    }

    // Define the handler functions separately
    function handleMouseMove(position) {
        gsap.to(cursor, {
            x: position.x,
            y: position.y,
        });
    }

    function handleMouseEnter() {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1,
        });
    }

    function handleMouseLeave() {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0,
        });
    }

   
    
    

    // Initial check and apply effect
    applyCursorEffect();

    // Check and reapply the effect on window resize
    window.addEventListener("resize", applyCursorEffect);
}

cursorEffect();


function addNavBarShadow() {
  const navbar = document.querySelector('nav'); 
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow ='0 4px 2px -2px #0e0e0e'
    } else {
      navbar.style.boxShadow =''
    }
  });
}


document.addEventListener('DOMContentLoaded', addNavBarShadow);


function setupOffcanvasNavigation() {
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
      //event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      var offcanvasElement = document.getElementById('offcanvasRight');
      var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const isInViewport = (rect.top >= 0 && rect.bottom <= window.innerHeight);

        if (!isInViewport) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

setupOffcanvasNavigation();


function homePageAnimation() {
  // Function to calculate experience
  function calcExp() {
    const exp = new Date().getFullYear() - 2021;
    document.getElementById("exp").innerHTML = exp + " years";
  }

  calcExp();

  const selector = {
    paragraph: Splitting({
      target: '.hero-paragraph-text',
      by: 'words',
    }),
    image: document.querySelector('.hero-bg'),
  };

  const initLenis = () => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    initScroll();
  };

  const initScroll = () => {
    gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
    gsap.set('.word', { autoAlpha: 0.4 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Animate the words' opacity
    tl.to('.word', {
      duration: 2,
      autoAlpha: 1,
      stagger: 1,
    })
      // Animate the hero background image
      .to(
        selector.image,
        {
          duration: 20,
          scale: 0.95,
          autoAlpha: 0,
          yPercent: -5,
        },
        0 // This makes the image animation run in parallel with the words
      );
  };

 
  window.addEventListener('DOMContentLoaded', initLenis);
}


homePageAnimation();


const copyrightMsg = () => {
    document.getElementById("year").innerHTML = "&copy" + new Date().getFullYear() + ". All rights reserved. ";
}

copyrightMsg();

function animateHeading() {
  const revealTexts = document.querySelectorAll(".reveal-text");
  
  revealTexts.forEach(text => {
    const section = text.closest("section").id;
    
  //  if (!section || !section.id) return;
    
    gsap.from(text, {
      y: "110%",
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: `#${section}`,
        start: "top 90%",
        scrub: .5
      }
    });
  });
}

animateHeading();


async function loadArtworks() {
  try {
    const response = await fetch('assets/data/artworks.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const artworks = data.artworks;
    let artworkContainer = document.getElementById('artwork-container');

    artworks.forEach(artwork => {
      let artworkElement = document.createElement('figure');
      artworkElement.classList.add('artwork');

      artworkElement.innerHTML = `
        <div class="artwork-img">
          <span class="post-thumbnail shimmer">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#535353" class="bi bi-image-alt" viewBox="0 0 16 16">
                <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
              </svg>
          </span>
          <img src="${artwork.image}" class="img-fluid featured-artworks" alt="${artwork.title}" style="display: none;">  
        </div>   
        <figcaption class="px-0 px-md-3">    
            <div class="text-container">
                <h2 class="artwork-tittle">${artwork.title}</h2>
            </div>              
            <p>${artwork.description}</p>
            <p><strong>Medium:</strong> ${artwork.medium}</p>
            <p><strong>Year:</strong> ${artwork.year}</p>
        </figcaption>
      `;

      artworkContainer.appendChild(artworkElement);

      const img = artworkElement.querySelector('.featured-artworks');
      const shimmer = artworkElement.querySelector('.post-thumbnail.shimmer');

      img.onload = function() {
        shimmer.classList.remove('post-thumbnail', 'shimmer');
        shimmer.style.display = 'none';
        img.style.display = 'block';

        gsap.registerPlugin(ScrollTrigger);

        gsap.from(artworkElement.querySelector('.artwork-tittle'), {
          y: "100%",
          duration: 0.5,
          scrollTrigger: {
            trigger: artworkElement,
            start: "top 90%",
            scrub: 0.1
          }
        });

        gsap.from(artworkElement.querySelectorAll('p'), {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: artworkElement,
            start: "top 90%",
            scrub: 1
          }
        });
      };

      img.onerror = function() {
        console.error('Error loading image:', artwork.image);
      };
    });
  } catch (error) {
    console.error('Error fetching the artwork data:', error);
  }
}

window.onload = function() {
  loadArtworks(); 
};


async function loadDisplayArtworks() {
    try {
        const response = await fetch('assets/data/artworks.json'); 
        const data = await response.json(); 

        const artworks = data.displayArt; 
        const swiperWrapper = document.getElementById('artworks-wrapper');

        // Create swiper-slide divs for each artwork using displayArt.src
        artworks.forEach(artwork => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const img = document.createElement('img');
            img.src = artwork.src;  
            img.alt = artwork.title; 

            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        initializeSwiper(); 
    } catch (error) {
        console.error('Error loading artworks:', error);
    }
}

function initializeSwiper() {
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 3,  // Default: 3 slides per view
        spaceBetween: 30,
        freeMode: true,
        loop: true,  // Infinite loop
        autoplay: {     
            delay: 2000,  // 2 seconds delay between automatic slide transitions
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {  // Breakpoints for responsive behavior
            768: {
                slidesPerView: 2,  // At screen widths >= 768px, display 1 slide
                spaceBetween: 20,  // Adjust space between slides as needed
            },
            1024: {
                slidesPerView: 3,  // At screen widths >= 1024px, display 3 slides
                spaceBetween: 30,  // Default space between slides
            },
            578: {
                slidesPerView: 2,  // At screen widths >= 768px, display 1 slide
                spaceBetween: 20,  // Adjust space between slides as needed
            }
        }
    });
}

loadDisplayArtworks();



function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const textarea = document.getElementById('message').value.trim();
  
  const toastLive = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  const toastBody = document.querySelector('.toast-body');

  // Regular expressions for validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[a-zA-Z\s]+$/; 
  
   
  if (name === '') {
    toastBody.innerHTML = "Name cannot be empty!";
    toastBootstrap.show();
    return false;
  } else if (!namePattern.test(name)) {
    toastBody.innerHTML = "Name can only contain letters and spaces!";
    toastBootstrap.show();
    return false;
  }

  if (email === '') {
    toastBody.innerHTML = "Email cannot be empty!";
    toastBootstrap.show();
    return false;
  } else if (!emailPattern.test(email)) {
    toastBody.innerHTML = "Please enter a valid email address!";
    toastBootstrap.show();
    return false;
  }
  
  if (textarea === '') {
      toastBody.innerHTML = "Message cannot be empty";
      toastBootstrap.show();
      return false
  }

  // If all validations pass
  toastBody.innerHTML = ""; // Clear any previous messages
  return true;
}

function sendEmail(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const toastLive = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  const toastBody = document.querySelector('.toast-body');
  
  if (validateForm()) {
    const emailParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs.send("service_jw0owvw", "template_fbvcoqm", emailParams)
    .then((response) => {
      toastBody.innerHTML = "Email sent successfully!";
      toastBootstrap.show();
    }, (error) => {
      toastBody.innerHTML = "Failed to send email. Please try again!";
      toastBootstrap.show();
    });
  }
}



document.getElementById("form").addEventListener("submit",sendEmail);

