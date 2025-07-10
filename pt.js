document.addEventListener("DOMContentLoaded", function () {
    const monthNames = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const currentMonthIndex = new Date().getMonth();
    const currentMonth = monthNames[currentMonthIndex];

    // highlight without scrolling on load
    highlightMonth(currentMonth, false);

    const dropdown = document.getElementById("month-selector");
    if (dropdown) {
        dropdown.addEventListener("change", function () {
            const selected = this.value;
            if (selected) {
                highlightMonth(selected, true); // allow scroll on dropdown
            }
        });
    }

    function highlightMonth(month, shouldScroll = true) {
        monthNames.forEach(m => {
            const el = document.querySelector(`.${m}`);
            if (el) el.classList.remove("highlight-month");
        });

        const monthEl = document.querySelector(`.${month}`);
        if (!monthEl) return;

        monthEl.classList.add("highlight-month");

        if (shouldScroll) {
            monthEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        const heading = document.querySelector(".currentwhole1 > div:last-child");
        if (heading) {
            heading.textContent = `${month.charAt(0).toUpperCase() + month.slice(1)} Prayer Time`;
        }

        const spans = monthEl.querySelectorAll("span");
        const topMorning = document.querySelector(".current1 :nth-child(3)");
        const topEvening = document.querySelector(".current2 :nth-child(3)");

        if (spans.length >= 3 && topMorning && topEvening) {
            topMorning.textContent = spans[1].textContent;
            topEvening.textContent = spans[2].textContent;
        }
    }
});

// Hamburger menu logic
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
});
