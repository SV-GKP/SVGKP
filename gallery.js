document.addEventListener("DOMContentLoaded", () => {
    // --- Dark Mode Toggle Logic (Copied from script.js for consistency) ---
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

    // --- Hamburger Menu Logic (Copied from script.js for consistency) ---
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

    // --- Gallery Logic ---
    const galleryGrid = document.getElementById("gallery-grid");
    const searchInput = document.getElementById("search-input");
    const dateFilter = document.getElementById("date-filter");
    const categoryFilter = document.getElementById("category-filter");
    const noEventsMessage = document.getElementById("no-events-message");

    const mediaLightbox = document.getElementById("media-lightbox");
    // CORRECTED: Target the close button by its new ID
    const closeLightboxBtn = document.getElementById("close-lightbox-btn"); 
    const lightboxMediaContainer = document.getElementById("lightbox-media-container");
    const prevMediaBtn = document.getElementById("prev-media");
    const nextMediaBtn = document.getElementById("next-media");
    const downloadMediaBtn = document.getElementById("download-media");


    let allEvents = []; // To store all fetched events
    let currentEventMedia = []; // Media for the currently opened event
    let currentMediaIndex = 0; // Index of the currently displayed media in lightbox

    // Function to fetch gallery events
    async function fetchGalleryEvents() {
        try {
            const response = await fetch('gallery_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allEvents = await response.json();
            renderGallery(allEvents);
        } catch (error) {
            console.error("Failed to load gallery events:", error);
            if (galleryGrid) galleryGrid.innerHTML = '<p class="text-center text-red-500 dark:text-red-400">Failed to load gallery events. Please try again later.</p>';
        }
    }

    // Function to render gallery cards
    function renderGallery(eventsToRender) {
        if (galleryGrid) galleryGrid.innerHTML = ''; // Clear existing content
        if (noEventsMessage) noEventsMessage.classList.add('hidden'); // Hide no events message by default

        if (eventsToRender.length === 0) {
            if (noEventsMessage) noEventsMessage.classList.remove('hidden');
            return;
        }

        eventsToRender.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('gallery-card', 'relative'); // Add relative for video overlay positioning
            card.dataset.eventId = event.id; // Store event ID for lightbox

            let thumbnailHtml = '';
            if (event.thumbnail.type === 'image') {
                thumbnailHtml = `<img src="${event.thumbnail.src}" alt="${event.title}" class="gallery-card-thumbnail">`;
            } else if (event.thumbnail.type === 'video') {
                thumbnailHtml = `
                    <video muted preload="metadata" class="gallery-card-thumbnail">
                        <source src="${event.thumbnail.src}#t=0.5" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-overlay"><i class="fas fa-play"></i></div>
                `;
            }

            card.innerHTML = `
                ${thumbnailHtml}
                <div class="gallery-card-info">
                    <h3>${event.title}</h3>
                    <p>${event.date} | ${event.category}</p>
                </div>
            `;
            if (galleryGrid) galleryGrid.appendChild(card);

            // Add click listener to open lightbox
            card.addEventListener('click', () => openLightbox(event));
        });
    }

    // Function to filter and search events
    function filterAndSearchEvents() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedDate = dateFilter ? dateFilter.value : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : '';

        const filteredEvents = allEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                                  event.category.toLowerCase().includes(searchTerm) ||
                                  event.date.toLowerCase().includes(searchTerm);
            
            const matchesDate = selectedDate === '' || event.date.includes(selectedDate);
            const matchesCategory = selectedCategory === '' || event.category === selectedCategory;

            return matchesSearch && matchesDate && matchesCategory;
        });
        renderGallery(filteredEvents);
    }

    // Lightbox Functions
    function openLightbox(event) {
        currentEventMedia = event.media;
        currentMediaIndex = 0;
        displayMediaInLightbox();
        if (mediaLightbox) mediaLightbox.classList.add('active');
        if (mediaLightbox) mediaLightbox.style.display = 'flex'; // Ensure it's visible
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeLightbox() {
        if (mediaLightbox) mediaLightbox.classList.remove('active');
        if (mediaLightbox) mediaLightbox.style.display = 'none'; // Hide it
        if (lightboxMediaContainer) lightboxMediaContainer.innerHTML = ''; // Clear media
        document.body.style.overflow = ''; // Restore scrolling
    }

    function displayMediaInLightbox() {
        const media = currentEventMedia[currentMediaIndex];
        if (lightboxMediaContainer) lightboxMediaContainer.innerHTML = ''; // Clear previous media

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.src;
            img.alt = `Media ${currentMediaIndex + 1}`;
            if (lightboxMediaContainer) lightboxMediaContainer.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.controls = true;
            video.autoplay = true; // Autoplay video
            if (lightboxMediaContainer) lightboxMediaContainer.appendChild(video);
        }

        // Update download link
        if (downloadMediaBtn) {
            downloadMediaBtn.href = media.src;
            downloadMediaBtn.style.display = media.src ? 'inline-flex' : 'none';
        }

        // Show/hide navigation buttons
        if (prevMediaBtn) prevMediaBtn.style.display = currentMediaIndex > 0 ? 'flex' : 'none'; // Changed to flex for consistency
        if (nextMediaBtn) nextMediaBtn.style.display = currentMediaIndex < currentEventMedia.length - 1 ? 'flex' : 'none'; // Changed to flex for consistency
    }

    function showNextMedia() {
        if (currentMediaIndex < currentEventMedia.length - 1) {
            currentMediaIndex++;
            displayMediaInLightbox();
        }
    }

    function showPrevMedia() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
            displayMediaInLightbox();
        }
    }

    // Event Listeners for Gallery
    if (searchInput) searchInput.addEventListener('input', filterAndSearchEvents);
    if (dateFilter) dateFilter.addEventListener('change', filterAndSearchEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSearchEvents);
    
    // Event listener for the close button
    if (closeLightboxBtn) { // Ensure button exists before adding listener
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    // Event listener to close lightbox when clicking/tapping outside media content
    if (mediaLightbox) {
        mediaLightbox.addEventListener('click', (event) => {
            // Check if the click target is the lightbox itself, not its children
            if (event.target === mediaLightbox) {
                closeLightbox();
            }
        });
        // Add touchend listener for mobile devices
        mediaLightbox.addEventListener('touchend', (event) => {
            // Check if the touch target is the lightbox itself, not its children
            if (event.target === mediaLightbox) {
                closeLightbox();
            }
        });
    }

    if (prevMediaBtn) prevMediaBtn.addEventListener('click', showPrevMedia);
    if (nextMediaBtn) nextMediaBtn.addEventListener('click', showNextMedia);

    // Initial load of events
    fetchGalleryEvents();
});
