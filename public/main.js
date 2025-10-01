document.addEventListener("DOMContentLoaded", () => {
    console.log("Frontend JavaScript loaded");
  
    // Example: simple alert when submitting form
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Form submitted! (not connected to backend yet)");
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
    
  