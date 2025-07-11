let startX = 0;
let endX = 0;

        const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("menu");
      
        hamburger.addEventListener("click", () => {
          menu.classList.toggle("show");
        });
      
      
fetch('events.json')
  .then(res => res.json())
  .then(data => {
    const eventContainer = document.querySelector('.event');
    eventContainer.innerHTML = ""; // Clear existing

    const today = new Date();

    const upcoming = data.filter(event => new Date(event.date) >= today);

    if (upcoming.length === 0) {
      eventContainer.innerHTML = "<p>No upcoming events right now.</p>";
      return;
    }

    upcoming.forEach(event => {
      eventContainer.innerHTML += `
        <div class="event1">
          <div><img src="${event.image}" alt="${event.title}" /></div>
          <div class="event1info">
            <div><strong>${event.title}</strong></div>
            <div class="event1add"><i class="fas fa-calendar-alt"></i> ${event.date}</div>
            <div class="event1add"><i class="fas fa-map-marker-alt"></i> ${event.place}</div>
          </div>
        </div>
      `;
    });
  })
  .catch(err => console.error("Failed to load events:", err));

let slideIndex = 0;
const slides = document.querySelectorAll('.campus-slider .slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Highlight active dot
  const dots = document.querySelectorAll(".slider-dots .dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Create navigation dots
const dotsContainer = document.getElementById("slider-dots");

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    slideIndex = i;
    showSlide(slideIndex);
  });
  dotsContainer.appendChild(dot);
});

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 20000);

showSlide(slideIndex);

// 🧠 Swipe support
const slider = document.querySelector('.campus-slider');

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (endX < startX - 50) nextSlide();      // swipe left
  else if (endX > startX + 50) prevSlide(); // swipe right
}

// 💡 Fullscreen lightbox support
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// When image is clicked
slides.forEach((img) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

img.addEventListener("click", () => {
  console.log("Image tapped!"); // Open DevTools on mobile (or remote debug)
});