document.addEventListener("DOMContentLoaded", () => {
  // Handle contact form submission to backend
  const contactForm = document.querySelector('form[action="/api/contact"]');
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      // Let the browser perform native validation first
      if (!contactForm.checkValidity()) {
        // Prevent submission so we can show native validation UI
        e.preventDefault();
        contactForm.reportValidity();
        return;
      }

      e.preventDefault();
      const statusEl = document.getElementById("form-status");
      if (statusEl) {
        statusEl.textContent = "Sending...";
      }

      try {
        const formEntries = Object.fromEntries(new FormData(contactForm).entries());
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { 
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formEntries)
        });

        const data = await response.json();

        if (response.ok) {
          if (statusEl) statusEl.textContent = data.message || "Thanks! Your message has been sent.";
          contactForm.reset();
        } else {
          if (statusEl) statusEl.textContent = data.error || "Oops, there was an error!";
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = "Network error. Please try again.";
      }
    });
  }

  // Handle projects link smooth scroll
  const projectsLink = document.querySelector('.projects-link');
  if (projectsLink) {
    projectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Handle project header click to scroll to projects
  const projectHeader = document.querySelector('#projects');
  
  if (projectHeader) {
    projectHeader.addEventListener('click', () => {
      projectHeader.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
  
  document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const slideImages = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
  
    let currentIndex = 0;
    const totalSlides = slideImages.length;
    let slideInterval;
  
    function showSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    function startAutoSlide() {
      stopAutoSlide(); // clear existing interval
      slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);
    }
  
    function stopAutoSlide() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    }
  
    prevBtn.addEventListener("click", () => {
      showSlide(currentIndex - 1);
      startAutoSlide(); // reset
    });
  
    nextBtn.addEventListener("click", () => {
      showSlide(currentIndex + 1);
      startAutoSlide(); // reset
    });
  
    // Start
    showSlide(0);
    startAutoSlide();
  });
    
  