const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("primary-nav");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.querySelector("ul").style.display = expanded ? "none" : "block";
    });
}
