// NAV BAR
// Get Button, nav list
// When button pressed, toggle nav and closebtn classes

const toggleNavBtn = document.getElementById("toggleMainNavBtn");
const navList = document.querySelector(".mainHeader__list");

toggleNavBtn.addEventListener("click", () => {
    toggleNavBtn.classList.toggle("mainHeader__toggleNavBtn--close");
    navList.classList.toggle("mainHeader__list--open");
});


// FEATURES TABS
// Get tabs, and corresponding slides
// On click, transform what is needed 
const featureTabBtns = document.querySelectorAll(".featureSelection__selector");
const featureSlides = document.querySelectorAll(".featureSlide");

let currentSlideIndex = 0;

featureTabBtns.forEach((element, index) => {
    element.addEventListener("change", (e) => {
        if (e.target.checked && index != currentSlideIndex) {
            featureSlides[currentSlideIndex].classList.remove("featureSlide--open");
            featureSlides[index].classList.add("featureSlide--open");
            currentSlideIndex = index;
        }
    });
});

// FAQ ACCORDION
// Get FAQ buttons and FAQ text sections
// On FAQ button click, change the FAQ button clase to --close to show up arrow ... 
//                      and add a --open class to show the text

const FAQBtns = document.querySelectorAll(".accordion__QuestionBtn");
const FAQanswerParagraphs = document.querySelectorAll(".accordion__answer");

FAQBtns.forEach((element, index) => {
    element.addEventListener("click", (e) => {
        FAQBtns[index].classList.toggle("accordion__QuestionBtn--close");
        FAQanswerParagraphs[index].classList.toggle("accordion__answer--open");
    });
});

// CONTACT FORM VALIDATION
// Get form, email input container, error message 
// When submitted, validate email
// If error, add error class to input container and add message to error message

const form = document.querySelector(".contactForm");
const emailInputContainer = document.querySelector(".contactForm__emailContainer");
const errorMessage = document.getElementById("emailError");

const emailValidation = (email) => {
    const emailRegex = /^\w+(\.?[^\.@]+)+@\w+\.\w+$/;
    return emailRegex.test(email);
};

function handleErrors() {
    emailInputContainer.classList.add("contactForm__emailContainer--error");
    errorMessage.textContent = "Whoops, make sure it's an email";
}

function resetForm() {
    form.reset();
    emailInputContainer.classList.remove("contactForm__emailContainer--error");
    errorMessage.textContent = "";
}

function handleSubmit() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const emailValid = data["email"];
    if (!emailValid) {
        handleErrors();
    } else {
        resetForm();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
})

