// Maps the URL hash to the matching HTML file in frontend/views.
const viewFiles = {
    home: "home.html",
    destinations: "destinations.html",
    guides: "travel-guides.html",
    about: "about.html",
    favorites: "favorites.html",
    login: "login.html",
    register: "register.html",
    profile: "profile.html",
    dashboard: "dashboard.html"
};

function currentRoute() {
    return window.location.hash.slice(1) || "home";
}

async function renderRoute() {
    const route = currentRoute();
    const baseRoute = route.startsWith("destination/") ? "destination-details" : route;
    const fileName = route.startsWith("destination/") ? "destination-details.html" : viewFiles[baseRoute];
    const app = document.getElementById("app");

    if (!fileName) {
        window.location.hash = "#home";
        return;
    }

    try {
        const response = await fetch("../views/" + fileName);
        if (!response.ok) throw new Error("View was not found");
        app.innerHTML = await response.text();

        document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + baseRoute);
        });

        if (window.bootstrap) {
            const menu = document.getElementById("mainNav");
            if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }

        renderPageContent(route);

        if (route === "destinations") {
            const search = document.getElementById("destinationSearch");
            if (search) search.focus({ preventScroll: true });
        }
        window.scrollTo(0, 0);
    } catch (error) {
        app.innerHTML = '<section class="section-space"><div class="container"><h1 class="h3">The page could not be loaded</h1><p class="muted">Run the project through XAMPP or Live Server so the HTML templates can load.</p><a href="#home" class="btn btn-primary">Back to home</a></div></section>';
        console.error(error);
    }
}

window.addEventListener("hashchange", renderRoute);
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent = new Date().getFullYear();
    renderRoute();
});
