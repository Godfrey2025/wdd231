const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("primary-nav");

function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("open");
}

function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
    nav.classList.add("open");
}

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        if (expanded) closeNav();
        else openNav();
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            closeNav();
        }
    });

    // Ensure nav state is correct on resize (desktop view shows flex nav via CSS)
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            // desktop: remove inline open state
            closeNav();
        }
    });
}
