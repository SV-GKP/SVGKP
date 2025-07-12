document.addEventListener("DOMContentLoaded", () => {
    // --- Dark Mode Toggle Logic ---
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const darkModeToggleMobile = document.getElementById("dark-mode-toggle-mobile");
    const body = document.body;

    // Function to set dark mode
    function setDarkMode(isEnabled) {
        if (isEnabled) {
            body.classList.add("dark-mode");
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for desktop
            if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for mobile
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for desktop
            if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for mobile
            localStorage.setItem("darkMode", "disabled");
        }
    }

    // Check for saved dark mode preference on page load
    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode === "enabled"); // Apply saved preference

    // Event listeners for dark mode toggles
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

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }

    // --- Upcoming Events Loading Logic ---
    const eventsContainer = document.getElementById('events-container');
    const noEventsMessage = document.getElementById('no-events-message');

    async function fetchUpcomingEvents() {
        try {
            const response = await fetch('events.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const events = await response.json();
            
            const today = new Date();
            const upcomingEvents = events.filter(event => new Date(event.date) >= today);

            if (upcomingEvents.length === 0) {
                if (noEventsMessage) noEventsMessage.classList.remove('hidden');
                return;
            }

            if (eventsContainer) {
                eventsContainer.innerHTML = ''; // Clear existing content
                upcomingEvents.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.classList.add('bg-white', 'dark:bg-gray-800', 'rounded-xl', 'shadow-lg', 'overflow-hidden', 'transform', 'hover:scale-105', 'transition-transform', 'duration-300');
                    eventCard.innerHTML = `
                        <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-contain">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">${event.title}</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4"><i class="fas fa-calendar-alt mr-2"></i>${event.date}</p>
                            <p class="text-gray-600 dark:text-gray-400 text-sm"><i class="fas fa-map-marker-alt mr-2"></i>${event.place}</p>
                        </div>
                    `;
                    eventsContainer.appendChild(eventCard);
                });
            }
        } catch (error) {
            console.error("Failed to load upcoming events:", error);
            if (eventsContainer) eventsContainer.innerHTML = '<p class="text-center text-red-500">Could not load upcoming events. Please try again later.</p>';
        }
    }

    fetchUpcomingEvents();

    // --- Campus Slider Logic ---
    const campusSlider = document.getElementById('campus-slider');
    const slides = campusSlider ? Array.from(campusSlider.children) : [];
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const sliderDotsContainer = document.getElementById('slider-dots');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    function updateSlider() {
        if (!campusSlider) return;
        campusSlider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        if (!sliderDotsContainer) return;
        sliderDotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                updateSlider();
                resetAutoSlide();
            });
            sliderDotsContainer.appendChild(dot);
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (slides.length > 0) {
        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        updateSlider(); // Initial display
        startAutoSlide(); // Start auto-sliding

        // Optional: Pause auto-slide on hover
        campusSlider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        campusSlider.addEventListener('mouseleave', startAutoSlide);
    }
});
