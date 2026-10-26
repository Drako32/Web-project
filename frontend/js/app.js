// Demo data. In a later phase, data can be loaded from the PHP API and MySQL database.
const destinations = [
    { id: "mostar", name: "Mostar", country: "Bosnia and Herzegovina", category: "Culture", days: "2–3 days", budget: "€40–70 per day", bestTime: "May–September", image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=1000&q=80", short: "Walk across the Old Bridge and explore the old bazaar.", description: "Mostar is known for its Ottoman architecture, lively old bazaar, and famous Old Bridge. It is ideal for history lovers, local food, and views of the Neretva River.", attractions: ["Old Bridge", "Kujundžiluk Old Bazaar", "Koski Mehmed Pasha Mosque", "Neretva Riverfront"], tips: ["Wear comfortable shoes when exploring the old town.", "Arrive early to avoid crowds.", "Try traditional Bosnian coffee."] },
    { id: "sarajevo", name: "Sarajevo", country: "Bosnia and Herzegovina", category: "City Break", days: "2–4 days", budget: "€45–80 per day", bestTime: "April–October", image: "images/sarajevo.jpg", short: "A city where different cultures and histories meet.", description: "Sarajevo brings together Ottoman, Austro-Hungarian, and contemporary heritage. Visit Baščaršija, discover the city’s history, and enjoy its coffee culture.", attractions: ["Baščaršija", "Latin Bridge", "City Hall", "Yellow Fortress"], tips: ["Make time for a walk through the old bazaar.", "Try Bosnian coffee and local specialties.", "Bring a jacket for an evening walk."] },
    { id: "bled", name: "Bled", country: "Slovenia", category: "Nature", days: "1–2 days", budget: "€70–120 per day", bestTime: "May–September", image: "images/bled.jpg", short: "Enjoy the lake, mountain scenery, and the small island.", description: "Bled is an Alpine destination surrounded by green hills and mountain views. Walk along the lake, visit the castle, or take a boat to the island.", attractions: ["Bled Island", "Bled Castle", "Lakeside Trail", "Ojstrica Viewpoint"], tips: ["Set out early for the viewpoint.", "Check the weather forecast before hiking.", "Try the traditional kremšnita cream cake."] },
    { id: "dubrovnik", name: "Dubrovnik", country: "Croatia", category: "Coastal", days: "2–3 days", budget: "€90–160 per day", bestTime: "May–June, September", image: "https://images.unsplash.com/photo-1555990793-da11153b2473?auto=format&fit=crop&w=1000&q=80", short: "Medieval walls, the Adriatic Sea, and narrow streets.", description: "Dubrovnik is known for its historic walls, terracotta rooftops, and clear Adriatic Sea. Explore the old town and nearby beaches.", attractions: ["City Walls", "Stradun", "Fort Lovrijenac", "Lokrum Island"], tips: ["Visit the city walls early or in the late afternoon.", "Book popular activities in advance during summer.", "Bring water on hot days."] },
    { id: "istanbul", name: "Istanbul", country: "Türkiye", category: "Culture", days: "3–5 days", budget: "€55–110 per day", bestTime: "April–May, September–October", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80", short: "Discover bazaars, mosques, and views of the Bosphorus.", description: "Istanbul connects Europe and Asia and offers rich history, colorful neighborhoods, views of the strait, and exciting food.", attractions: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus ferry ride"], tips: ["Ferries are a scenic way to travel between the two shores.", "Follow dress codes at religious sites.", "Check opening hours before visiting."] },
    { id: "rome", name: "Rome", country: "Italy", category: "History", days: "3–4 days", budget: "€80–150 per day", bestTime: "April–June, September–October", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1000&q=80", short: "Ancient landmarks, piazzas, and Italian cuisine.", description: "Rome is like an open-air museum, with ancient ruins, churches, lively squares, and restaurants serving classic Italian dishes.", attractions: ["Colosseum", "Roman Forum", "Trevi Fountain", "Vatican Museums"], tips: ["Book tickets for the most popular sights in advance.", "Wear comfortable shoes for cobblestone streets.", "Bring a water bottle."] }
];

const guides = [
    { icon: "🎒", title: "Smart Packing", category: "Before You Go", text: "Make a short checklist, pack versatile clothes, and keep your documents in your carry-on." },
    { icon: "💶", title: "Budget Planning", category: "Money", text: "Set a daily budget for food, transport, and activities. Keep some money for unexpected costs." },
    { icon: "🗺️", title: "Getting Around", category: "On the Go", text: "Check public transport tickets, save an offline map, and check the last departure." },
    { icon: "🌿", title: "Responsible Travel", category: "Travel Better", text: "Respect local customs, reduce plastic use, and support local shops and restaurants." }
];

function getFavorites() {
    return JSON.parse(localStorage.getItem("travelExploreFavorites") || "[]");
}

function saveFavorites(items) {
    localStorage.setItem("travelExploreFavorites", JSON.stringify(items));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {
    let items = getFavorites();
    if (items.includes(id)) {
        items = items.filter(function (savedId) { return savedId !== id; });
    } else {
        items.push(id);
    }
    saveFavorites(items);
    renderRoute();
}

function destinationCard(place) {
    const heart = isFavorite(place.id) ? "♥" : "♡";
    const favoriteClass = isFavorite(place.id) ? "is-favorite" : "";
    return `
        <div class="col-md-6 col-xl-4">
            <article class="destination-card">
                <div class="image-wrap">
                    <img class="destination-image" src="${place.image}" alt="${place.name}" loading="lazy">
                    <button class="favorite-button ${favoriteClass}" data-favorite="${place.id}" aria-label="Save ${place.name} to favorites">${heart}</button>
                </div>
                <div class="destination-body">
                    <div class="card-meta mb-2">${place.country} · ${place.category}</div>
                    <h3>${place.name}</h3><p>${place.short}</p>
                    <div class="d-flex justify-content-between align-items-center gap-2">
                        <span class="card-meta">${place.days}</span>
                        <a class="btn btn-outline-primary btn-sm rounded-pill px-3" href="#destination/${place.id}">Details</a>
                    </div>
                </div>
            </article>
        </div>`;
}

function renderFeatured() {
    const area = document.getElementById("featuredDestinations");
    if (area) area.innerHTML = destinations.slice(0, 3).map(destinationCard).join("");
}

function renderDestinationList() {
    const area = document.getElementById("destinationList");
    if (!area) return;
    area.innerHTML = destinations.map(destinationCard).join("");
    const count = document.getElementById("destinationCount");
    if (count) count.textContent = destinations.length + " destinations";
}

function filterDestinations() {
    const searchInput = document.getElementById("destinationSearch");
    const categoryInput = document.getElementById("categoryFilter");
    const area = document.getElementById("destinationList");
    if (!searchInput || !categoryInput || !area) return;

    const search = searchInput.value.toLowerCase();
    const category = categoryInput.value;
    const results = destinations.filter(function (place) {
        const text = (place.name + " " + place.country + " " + place.short).toLowerCase();
        return text.includes(search) && (!category || place.category === category);
    });

    area.innerHTML = results.map(destinationCard).join("");
    document.getElementById("destinationCount").textContent = results.length + " destinations found";
    if (results.length === 0) {
        area.innerHTML = '<div class="col-12"><div class="empty-state"><h2 class="h5">No results</h2><p class="muted mb-0">Change your search term or clear the filters.</p></div></div>';
    }
}

function renderDestinationDetails(id) {
    const area = document.getElementById("destinationDetails");
    if (!area) return;
    const place = destinations.find(function (item) { return item.id === id; });
    if (!place) {
        area.innerHTML = '<div class="empty-state"><h1 class="h4">Destination not found</h1><a href="#destinations">Back to destinations</a></div>';
        return;
    }
    area.innerHTML = `
        <div class="row g-4 align-items-start">
            <div class="col-lg-7">
                <img class="detail-hero mb-4" src="${place.image}" alt="${place.name}">
                <div class="eyebrow mb-2">${place.country} · ${place.category}</div>
                <h1 class="display-5 fw-bold">${place.name}</h1><p class="lead muted">${place.description}</p>
                <h2 class="h4 fw-bold mt-4">Things to See</h2>
                <ul>${place.attractions.map(function (item) { return `<li class="mb-2">${item}</li>`; }).join("")}</ul>
                <h2 class="h4 fw-bold mt-4">Helpful Tips</h2>
                <ul>${place.tips.map(function (item) { return `<li class="mb-2">${item}</li>`; }).join("")}</ul>
            </div>
            <div class="col-lg-5"><aside class="detail-panel">
                <h2 class="h5 fw-bold">Trip Overview</h2>
                <p><strong>Recommended stay:</strong> ${place.days}</p>
                <p><strong>Estimated budget:</strong> ${place.budget}</p>
                <p><strong>Best time to visit:</strong> ${place.bestTime}</p>
                <button class="btn ${isFavorite(place.id) ? "btn-outline-danger" : "btn-primary"} w-100 rounded-pill" data-favorite="${place.id}">${isFavorite(place.id) ? "♥ Remove from favorites" : "♡ Save to favorites"}</button>
                <p class="small muted mt-3 mb-0">Prices are estimates for illustration. Check current prices before travelling.</p>
            </aside></div>
        </div>`;
}

function renderGuides() {
    const area = document.getElementById("guideList");
    if (!area) return;
    area.innerHTML = guides.map(function (guide) {
        return `<div class="col-md-6"><article class="guide-card">
            <div class="guide-icon">${guide.icon}</div><div class="eyebrow mb-2">${guide.category}</div>
            <h2 class="h4 fw-bold">${guide.title}</h2><p class="muted mb-0">${guide.text}</p>
        </article></div>`;
    }).join("");
}

function renderFavorites() {
    const area = document.getElementById("favoriteList");
    if (!area) return;
    const saved = destinations.filter(function (place) { return getFavorites().includes(place.id); });
    if (saved.length) {
        area.innerHTML = `<div class="row g-4">${saved.map(destinationCard).join("")}</div>`;
    } else {
        area.innerHTML = `<div class="empty-state"><div class="empty-icon">♡</div><h2 class="h4 fw-bold mt-3">No favorite destinations yet</h2><p class="muted">Open Destinations and click the heart to save a place.</p><a class="btn btn-primary rounded-pill px-4" href="#destinations">Explore destinations</a></div>`;
    }
}

function renderPageContent(route) {
    if (route === "home") renderFeatured();
    if (route === "destinations") renderDestinationList();
    if (route.startsWith("destination/")) renderDestinationDetails(route.split("/")[1]);
    if (route === "guides") renderGuides();
    if (route === "favorites") renderFavorites();
}

document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-favorite]");
    if (button) toggleFavorite(button.dataset.favorite);

    if (event.target.id === "clearFilters") {
        document.getElementById("destinationSearch").value = "";
        document.getElementById("categoryFilter").value = "";
        filterDestinations();
    }
});

document.addEventListener("input", function (event) {
    if (event.target.id === "destinationSearch") filterDestinations();
});

document.addEventListener("change", function (event) {
    if (event.target.id === "categoryFilter") filterDestinations();
});

document.addEventListener("submit", function (event) {
    if (!event.target.classList.contains("demo-form")) return;
    event.preventDefault();

    if (event.target.id === "registerForm") {
        const first = document.getElementById("registerPassword").value;
        const second = document.getElementById("registerPasswordAgain").value;
        if (first !== second) {
            alert("Passwords do not match.");
            return;
        }
    }
    alert("This is a demo form. A backend must be connected for real login or registration.");
    event.target.reset();
});
