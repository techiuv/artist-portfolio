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

//cursorEffect();


function initializeNavigation() {
  const navbar = document.querySelector('nav'); 

  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 2px -2px #0e0e0e';
    } else {
      navbar.style.boxShadow = '';
    }
  });

  // Set up off-canvas navigation
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      const offcanvasElement = document.getElementById('offcanvasRight');
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

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

document.addEventListener('DOMContentLoaded', initializeNavigation);



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
    gsap.set('.word', { autoAlpha: 0.4 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Animate the words' opacity
    tl.to('.word', {
      duration: 2,
      autoAlpha: 1,
      stagger: 1,
    });
  };

  window.addEventListener('DOMContentLoaded', initLenis);
}

homePageAnimation();


function animateHeading() {
  const revealTexts = document.querySelectorAll(".reveal-text");

  revealTexts.forEach(text => {
    const section = text.closest("section")?.id;
    
    if (!section) return;
    
    gsap.from(text, {
      y: 100,
      duration: 1.2,
      stagger: .3,
      scrollTrigger: {
        trigger: `#${section}`,
        start: "top 90%",        
        end: "bottom center",
        toggleActions: "play none none reset", 
      }
    });
  });
}

animateHeading();

async function loadAndDisplayArtworks() {
  try {
    const response = await fetch('assets/data/data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Load main artworks gallery
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
          <img src="${artwork.image}" class="img-fluid featured-artworks" alt="${artwork.title}" data-bs-toggle="modal" data-bs-target="#imageModal" style="display: none;">  
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

      // Event listener to set the modal image source when clicked
      img.addEventListener('click', () => {
        document.getElementById('modalImage').src = artwork.image;
      });

      img.onload = function() {
        shimmer.classList.remove('post-thumbnail', 'shimmer');
        shimmer.style.display = 'none';
        img.style.display = 'block';
      };

      img.onerror = function() {
        console.error('Error loading image:', artwork.image);
      };

      // GSAP animations for artwork title and paragraphs
      gsap.from(artworkElement.querySelector('.artwork-tittle'), {
        y: "100%",
        duration: 1,
        scrollTrigger: {
          trigger: artworkElement,
          start: "top 75%",
          end: "bottom center",
          toggleActions: "play none none reset", 
        }
      });

      gsap.from(artworkElement.querySelectorAll('p'), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: artworkElement,
          start: "top 75%",
          end: "bottom center",
          toggleActions: "play none none reset", 
        }
      });
    });
    
    // Load display artworks
    const displayArtworks = data.displayArt; 
    const displayWrapper = document.getElementById('display-wrapper');

    displayArtworks.forEach(artwork => { 
      const slide = document.createElement('div');
      slide.classList.add('col-6','col-md-4','px-0','px-md-4','py-2','py-md-4');
      
      slide.innerHTML = `
        <img src="${artwork.src}" alt="" class="img-fluid displayWork" style="display: none;" data-bs-toggle="modal" data-bs-target="#Modal">
        <span class="post-thumbnail shimmer">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#535353" class="bi bi-image-alt" viewBox="0 0 16 16">
            <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
          </svg>
        </span>
      `;

      displayWrapper.appendChild(slide);

      const displayWork = slide.querySelector('.displayWork');
      const shimmer = slide.querySelector('.post-thumbnail.shimmer');

      // Event listener to open modal and set image source
      displayWork.addEventListener('click', () => {
        document.getElementById('displayWorkModalImage').src = artwork.src;
      });

      displayWork.onload = function() {
        shimmer.classList.remove('post-thumbnail', 'shimmer');
        shimmer.style.display = 'none';
        displayWork.style.display = 'block';
      };

      displayWork.onerror = function() {
        console.error('Error loading image:', artwork.src);
      };
    });

  } catch (error) {
    console.error('Error fetching the artwork data:', error);
  }
}

loadAndDisplayArtworks();


async function loadUpcomingProjects() {
  try {
    const response = await fetch('assets/data/data.json'); // Path to your JSON file

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const projects = data.upcomingProjects; // Adjusted according to your JSON structure
    const projectsContainer = document.getElementById('upcoming-projects-container'); // Make sure this element exists in your HTML

    projects.forEach(project => {
      const projectElement = document.createElement('article');
      projectElement.classList.add('project');

      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Estimated Completion:</strong> ${project.estimatedCompletion}</p>
        <p><strong>Medium:</strong> ${project.medium}</p>
        <img src="${project.image}" alt="${project.title} artwork" class="img-fluid">
      `;

      projectsContainer.appendChild(projectElement);
    });

  } catch (error) {
    console.error('Error fetching the upcoming projects:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadUpcomingProjects();
});


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

const copyrightMsg = () => {
    document.getElementById("year").innerHTML = "&copy" + new Date().getFullYear() + ". All rights reserved. ";
}

copyrightMsg();



