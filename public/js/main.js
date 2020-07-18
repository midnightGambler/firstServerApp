const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector(".mobile-nav-toggler");

function backdropClickHandler() {
  backdrop.classList.remove("active");
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.classList.toggle("active");
  sideDrawer.classList.toggle("open");
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
