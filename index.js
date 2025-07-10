
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

