
// MENU BURGER

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    menu.classList.toggle("open");
});