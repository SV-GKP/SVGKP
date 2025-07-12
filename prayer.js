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

    // --- Prayer Time Logic ---
    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    // Data for prayer times (you can fetch this from a JSON if it becomes complex)
    const prayerTimesData = {
        "january": { morning: "06:44", evening: "05:26" },
        "february": { morning: "06:30", evening: "05:47" },
        "march": { morning: "06:03", evening: "06:05" },
        "april": { morning: "05:31", evening: "06:19" },
        "may": { morning: "05:08", evening: "06:36" },
        "june": { morning: "05:03", evening: "06:49" },
        "july": { morning: "05:13", evening: "06:49" },
        "august": { morning: "05:28", evening: "06:30" },
        "september": { morning: "05:42", evening: "05:59" },
        "october": { morning: "05:56", evening: "05:27" },
        "november": { morning: "06:15", evening: "05:06" },
        "december": { morning: "06:36", evening: "05:07" }
    };

    const currentMorningTimeEl = document.getElementById("current-morning-time");
    const currentEveningTimeEl = document.getElementById("current-evening-time");
    const currentMonthHeadingEl = document.getElementById("current-month-heading");
    const monthSelector = document.getElementById("month-selector");
    // Removed: const currentPrayerTimesSection = document.getElementById("current-prayer-times-section"); 

    function updatePrayerTimesDisplay(month) {
        const data = prayerTimesData[month];
        if (data) {
            if (currentMorningTimeEl) currentMorningTimeEl.textContent = data.morning;
            if (currentEveningTimeEl) currentEveningTimeEl.textContent = data.evening;
            if (currentMonthHeadingEl) currentMonthHeadingEl.textContent = `${month.charAt(0).toUpperCase() + month.slice(1)} Prayer Time`;
        }
    }

    function highlightMonthCard(month, shouldScroll = true) { // Added shouldScroll parameter
        // Remove highlight from all cards first
        document.querySelectorAll('.prayer-month-card').forEach(card => {
            card.classList.remove('highlight-month');
        });

        // Add highlight to the selected month's card
        const selectedMonthCard = document.getElementById(month);
        if (selectedMonthCard) {
            selectedMonthCard.classList.add('highlight-month');
            // Optional: Scroll to the highlighted month if shouldScroll is true
            if (shouldScroll) {
                selectedMonthCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Initialize with current month's prayer time
    const currentMonthIndex = new Date().getMonth();
    const initialMonth = monthNames[currentMonthIndex];
    if (monthSelector) {
        monthSelector.value = initialMonth; // Set dropdown to current month
    }
    updatePrayerTimesDisplay(initialMonth);
    // Call highlightMonthCard with shouldScroll = false for initial load
    highlightMonthCard(initialMonth, false); 

    // Scroll to the month selector section on page load
    if (monthSelector) { // Check if monthSelector exists
        // Use setTimeout to ensure the layout has rendered before scrolling
        setTimeout(() => {
            monthSelector.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the month selector
        }, 100); // Small delay to ensure elements are rendered
    }


    // Event listener for month selector dropdown
    if (monthSelector) {
        monthSelector.addEventListener("change", function () {
            const selectedMonth = this.value;
            if (selectedMonth) {
                updatePrayerTimesDisplay(selectedMonth);
                highlightMonthCard(selectedMonth, true); // Scroll when month is selected via dropdown
            }
        });
    }
});
