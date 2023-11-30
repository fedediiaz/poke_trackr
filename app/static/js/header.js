let isMenuOpen = false;
const menu = document.getElementById("menu");
const menuButton = document.getElementById("menu-button");

function toggleMenu() {
    menu.classList.toggle("hidden");
}

menuButton.addEventListener("click", toggleMenu);