// Nav Bar 
// Get Hamburger button 
// When clicked, change class from open to close or close to open via toggle("btn--close")
// Same toggle for nav(nav--open)
const overlay = document.querySelector(".overlay");
const openNavBtn = document.getElementById("openNavBtn");
const navBar = document.querySelector(".nav__list");
openNavBtn.addEventListener("click", (e) => {
    overlay.classList.toggle("overlay--open");
    openNavBtn.classList.toggle("openNavBtn--close"); // toggle "X" on the button
    navBar.classList.toggle("nav__list--open");
});

// First, get all slide elements
//      Images, and text slides
//      Arrow Btns
// Index variable
// Event listener to change index
// When change index(with arrow btn) shift the slides left or right
const imagesSlideshow = document.querySelector(".imagesSlide");
const textSlideshow = document.querySelector(".textSlide");
const leftArrowBtn = document.getElementById("leftArrowBtn");
const rightArrowBtn = document.getElementById("rightArrowBtn");
let currentIndex = 0;
const numSlides = 3;

function handleIndexChange(index, direction, max) {
    index += direction;
    if (index >= max) {
        index = 0;
    } else if (index < 0) {
        index = max - 1;
    }
    return index;
}

function handleSlideChange(direction) {
    currentIndex = handleIndexChange(currentIndex, direction, numSlides);
    imagesSlideshow.style.transform = `translateX(${-currentIndex*100}%)`;
    textSlideshow.style.transform = `translateX(${-currentIndex*100/3}%)`;

}


leftArrowBtn.addEventListener("click", (e) => {
    handleSlideChange(-1); // Remove from index
});

rightArrowBtn.addEventListener("click", (e) => {
    handleSlideChange(1); // Add to index
});