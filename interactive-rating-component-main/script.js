const ratingStateEl = document.getElementById("rating-state");
const form = document.getElementById("form");
const errorEl = document.getElementById("input-error");
const thankyouStateEl = document.getElementById("thank-you-state");
const userRatingEl = document.getElementById("user-rating");

function validateForm(data) {
    let valid = true;
    if (Object.keys(data).length === 0) {
        valid = false;
    }   
    return valid;
}

function updateDisplay(data) {
    ratingStateEl.classList.add("hidden");
    thankyouStateEl.classList.remove("hidden");

    userRatingEl.textContent = ` You selected ${data["rating-btns"]} out of 5`;
}

function handleSubmit(form, errorEl) {
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData);

    if (!validateForm(dataObj)) {
        errorEl.textContent = "Please select a rating";
        return;
    } 

    errorEl.textContent = "";

    form.reset();
    updateDisplay(dataObj);

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit(e.target, errorEl);
});

form.addEventListener("change", (e) => {
    errorEl.textContent = ""; // Remove error message when option selected
});