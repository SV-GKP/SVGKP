document.addEventListener("DOMContentLoaded", () => {
    // --- Popup Notice Logic ---
// const popup = document.getElementById("popup-notice");
// const closeBtn = document.getElementById("close-popup");

// // Show popup every time page loads
// if (popup) {
//     popup.classList.remove("hidden");
// }

// if (closeBtn) {
//     closeBtn.addEventListener("click", () => {
//         const popupBox = document.getElementById("popup-box");
// if (popupBox) {
//     popupBox.classList.add("animate-fadeOutScale");

//     // Wait for animation to finish, then hide
//     setTimeout(() => {
//         popup.classList.add("hidden");
//         popupBox.classList.remove("animate-fadeOutScale"); // reset for future use
//     }, 300); // match animation duration
// }
//     });
// }

// // Close popup when clicking outside the image box
// popup.addEventListener("click", (event) => {
//     const popupBox = document.getElementById("popup-box");
//     if (popupBox && !popupBox.contains(event.target)) {
//         const popupBox = document.getElementById("popup-box");
// if (popupBox) {
//     popupBox.classList.add("animate-fadeOutScale");

//     // Wait for animation to finish, then hide
//     setTimeout(() => {
//         popup.classList.add("hidden");
//         popupBox.classList.remove("animate-fadeOutScale"); // reset for future use
//     }, 300); // match animation duration
// }
//     }
// });

// if (popup) {
//     setTimeout(() => {
//         popup.classList.remove("hidden");
//     }, 300);
// }

// // When someone clicks on that image
// const popupImageLink = document.querySelector("#popup-box a");

// if (popupImageLink) {
//     popupImageLink.addEventListener("click", () => {
//         const popupBox = document.getElementById("popup-box");
//         if (popupBox) {
//             popupBox.classList.add("animate-fadeOutScale");
//             setTimeout(() => {
//                 popup.classList.add("hidden");
//                 popupBox.classList.remove("animate-fadeOutScale");
//             }, 300);
//         }
//     });
// }

// // --- Countdown Timer Logic ---
// const countdownElement = document.getElementById("countdown");

// // Set your event date/time (example: Boroma's Janma Diwas)
// const eventDate = new Date("2025-09-16T11:00:00");

// function updateCountdown() {
//     const now = new Date();
//     const diff = eventDate - now;

//     if (diff <= 0) {
//         countdownElement.textContent = "The event has started!";
//         return;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((diff / (1000 * 60)) % 60);
//     const seconds = Math.floor((diff / 1000) % 60);

//     countdownElement.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
// }

// if (countdownElement) {
//     updateCountdown(); // initial call
//     setInterval(updateCountdown, 1000); // update every second
// }



    // --- Dark Mode Toggle Logic ---
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const darkModeToggleMobile = document.getElementById("dark-mode-toggle-mobile");
    const body = document.body;

    function setDarkMode(isEnabled) {
        if (isEnabled) {
            body.classList.add("dark-mode");
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("darkMode", "disabled");
        }
    }

    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode === "enabled");

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            setDarkMode(!body.classList.contains("dark-mode"));
        });
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener("click", () => {
            setDarkMode(!body.classList.contains("dark-mode"));
        });
    }

    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("show");
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }

    // --- Campus Slider Logic ---
    const campusSlider = document.getElementById('campus-slider');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const sliderDotsContainer = document.getElementById('slider-dots');

    if (campusSlider) {
        const slides = campusSlider.querySelectorAll('img');
        let currentSlide = 0;
        let autoSlideInterval;

        function updateSliderPosition() {
            campusSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }

        function goToNextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSliderPosition();
        }

        function goToPrevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSliderPosition();
        }

        function createDots() {
            if (sliderDotsContainer) {
                sliderDotsContainer.innerHTML = ''; // Clear existing dots
                slides.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('w-3', 'h-3', 'bg-gray-400', 'rounded-full', 'cursor-pointer', 'transition-colors', 'duration-300');
                    dot.addEventListener('click', () => {
                        currentSlide = index;
                        updateSliderPosition();
                        resetAutoSlide();
                    });
                    sliderDotsContainer.appendChild(dot);
                });
                updateDots();
            }
        }

        function updateDots() {
            if (sliderDotsContainer) {
                const dots = sliderDotsContainer.querySelectorAll('span');
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('bg-orange-500');
                        dot.classList.remove('bg-gray-400');
                    } else {
                        dot.classList.remove('bg-orange-500');
                        dot.classList.add('bg-gray-400');
                    }
                });
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(goToNextSlide, 10000); // Change slide every 5 seconds
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        prevSlideBtn.addEventListener('click', () => {
            goToPrevSlide();
            resetAutoSlide();
        });

        nextSlideBtn.addEventListener('click', () => {
            goToNextSlide();
            resetAutoSlide();
        });

        // Touch swipe for Campus Slider
        let touchStartX = 0;
        let touchEndX = 0;

        campusSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        campusSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) { // Swiped left
                goToNextSlide();
                resetAutoSlide();
            } else if (touchEndX > touchStartX + 50) { // Swiped right
                goToPrevSlide();
                resetAutoSlide();
            }
        }

        createDots();
        startAutoSlide();
    }

    // --- Upcoming Events Logic ---
    const eventsContainer = document.getElementById("events-container");
    const noEventsMessage = document.getElementById("no-events-message");

    async function fetchEvents() {
        try {
            const response = await fetch('events.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const events = await response.json();
            
            const now = new Date();
            const upcomingEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.setHours(0, 0, 0, 0) >= now.setHours(0, 0, 0, 0);
            });

            renderEvents(upcomingEvents);
        } catch (error) {
            console.error("Failed to load events:", error);
            if (eventsContainer) eventsContainer.innerHTML = '<p class="text-center text-red-500 dark:text-red-400">Failed to load events. Please try again later.</p>';
        }
    }

    function renderEvents(events) {
        if (eventsContainer) eventsContainer.innerHTML = ''; // Clear existing events
        if (noEventsMessage) noEventsMessage.classList.add('hidden'); // Hide no events message by default

        if (events.length === 0) {
            if (noEventsMessage) noEventsMessage.classList.remove('hidden');
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('bg-white', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'shadow-md', 'border-t-4', 'border-orange-500', 'transform', 'hover:scale-105', 'transition-transform', 'duration-300');
            eventCard.innerHTML = `
                <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-cambria">${event.title}</h3>
                <p class="text-orange-600 dark:text-orange-300 mb-2 font-exo"><i class="fas fa-calendar-alt mr-2"></i>${event.date}</p>
                <p class="text-gray-700 dark:text-gray-300 mb-4 font-baloo-bhai"><i class="fas fa-clock mr-2"></i>${event.time}</p> <p class="text-gray-700 dark:text-gray-300 mb-4 font-baloo-bhai">${event.place}</p>
            `;
            if (eventsContainer) eventsContainer.appendChild(eventCard);
        });
    }

    // Initial load of events
    fetchEvents();

    // --- Revered Personalities Slideshow Logic (for mobile) ---
    const personalitiesSlideshow = document.getElementById('personalities-slideshow');
    const personalitiesDotsContainer = document.getElementById('personalities-dots');

    if (personalitiesSlideshow) {
        const slides = personalitiesSlideshow.querySelectorAll('.flex-shrink-0'); // Each personality div is a slide
        let currentPersonalitySlide = 0;

        function updatePersonalitySlideshowPosition() {
            personalitiesSlideshow.style.transform = `translateX(-${currentPersonalitySlide * 100}%)`;
            updatePersonalityDots();
        }

        function goToNextPersonalitySlide() {
            currentPersonalitySlide = (currentPersonalitySlide + 1) % slides.length;
            updatePersonalitySlideshowPosition();
        }

        function goToPrevPersonalitySlide() {
            currentPersonalitySlide = (currentPersonalitySlide - 1 + slides.length) % slides.length;
            updatePersonalitySlideshowPosition();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(goToNextSlide, 10000); // Change slide every 5 seconds
        }

        function createPersonalityDots() {
            if (personalitiesDotsContainer) {
                personalitiesDotsContainer.innerHTML = ''; // Clear existing dots
                slides.forEach((_, index) => {
                    const dot = document.createElement('span');
                    // Changed bg-gray-400 to bg-gray-200 for better contrast
                    dot.classList.add('w-3', 'h-3', 'bg-gray-200', 'rounded-full', 'cursor-pointer', 'transition-colors', 'duration-300');
                    dot.addEventListener('click', () => {
                        currentPersonalitySlide = index;
                        updatePersonalitySlideshowPosition();
                    });
                    personalitiesDotsContainer.appendChild(dot);
                });
                updatePersonalityDots();
            }
        }

        function updatePersonalityDots() {
            if (personalitiesDotsContainer) {
                const dots = personalitiesDotsContainer.querySelectorAll('span');
                dots.forEach((dot, index) => {
                    if (index === currentPersonalitySlide) {
                        dot.classList.add('bg-black'); // Changed to white for active dot
                        dot.classList.remove('bg-gray-200');
                    } else {
                        dot.classList.remove('bg-black'); // Changed to white for inactive dot
                        dot.classList.add('bg-gray-200');
                    }
                });
            }
        }

        // Touch swipe for Personalities Slideshow
        let touchStartXPersonalities = 0;
        let touchEndXPersonalities = 0;

        personalitiesSlideshow.addEventListener('touchstart', (e) => {
            touchStartXPersonalities = e.touches[0].clientX;
        });

        personalitiesSlideshow.addEventListener('touchend', (e) => {
            touchEndXPersonalities = e.changedTouches[0].clientX;
            handlePersonalitySwipe();
        });

        function handlePersonalitySwipe() {
            if (touchEndXPersonalities < touchStartXPersonalities - 50) { // Swiped left
                goToNextPersonalitySlide();
            } else if (touchEndXPersonalities > touchStartXPersonalities + 50) { // Swiped right
                goToPrevPersonalitySlide();
            }
        }

        // Initialize slideshow on page load for mobile
        createPersonalityDots();
        updatePersonalitySlideshowPosition(); // Ensure first slide is shown
    }
});


