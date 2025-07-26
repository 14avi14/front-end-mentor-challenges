// Get buttons elements
// Add event listeners for when clicked
// If clicked, change src of image and change height of elements

const accordionCheckBoxes = document.querySelectorAll(".accordion-btn");
const accordionLabels = document.querySelectorAll(".accordion-btn-label");
const accordionTexts = document.querySelectorAll(".accordion-text");

const plusImageSrc = "./assets/images/icon-plus.svg";
const minusImageSrc = "./assets/images/icon-minus.svg";

function handleCheckBoxChanges(checked, index) {
    if (checked) {
        accordionTexts[index].style.maxHeight = accordionTexts[index].scrollHeight + "px";
        accordionLabels[index].classList.add("expanded-btn-label");
    } else {
        accordionTexts[index].style.maxHeight = null;
        accordionLabels[index].classList.remove("expanded-btn-label");
    }
    


}

accordionCheckBoxes.forEach((button, index) => {
    button.addEventListener("change", function() {
        handleCheckBoxChanges(this.checked, index);
    });
});