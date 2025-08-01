const navBtn = document.getElementById("navBtn");
const navBar = document.getElementById("mainHeaderNav");

navBtn.addEventListener("click", (e) => {
    navBar.classList.toggle("mainHeader__nav--open");
    navBtn.classList.toggle("mainHeader__navBtn--close");
});



const tabletMedia = window.matchMedia("(min-width: 64em)");

const creationCards = document.querySelectorAll(".creationGrid__creation");
const creationImages = [
    "image-deep-earth.jpg",
    "image-night-arcade.jpg",
    "image-soccer-team.jpg",
    "image-grid.jpg",
    "image-from-above.jpg",
    "image-pocket-borealis.jpg",
    "image-curiosity.jpg",
    "image-fisheye.jpg"
];

function updateCreationBgImages() {
    if (tabletMedia.matches) {
        creationCards.forEach((element, index) => {
            element.style.background = `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5)), no-repeat center / cover url("./images/desktop/${creationImages[index]}")`;
        });
    } else {
        creationCards.forEach((element, index) => {
            element.style.background = `no-repeat top / cover url("./images/mobile/${creationImages[index]}")`;
        });
    }
}

updateCreationBgImages();

tabletMedia.onchange = (e) => {
    updateCreationBgImages();
}