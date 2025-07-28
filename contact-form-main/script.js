// Get form
// On submit...
//      Validate inputs
//      If there are any errors, display the correct error element
//      Once validated...
//          Reset form
//          Display the toast message

const form = document.getElementById("form");
const errorElements = document.querySelectorAll(".errors");
const toastMessage = document.getElementById("success-toast-message");

// Make toast message disappear once animation is finished
toastMessage.addEventListener("animationend", function() {
    this.classList.remove("toast-message-slidedown-animation");
    this.classList.add("hidden");
})

const validations = {
    "first-name": (fname) => !fname.trim() ? "This field is required": "", // Test for any non-space characters
    "last-name": (lname) => !lname.trim() ? "This field is required": "",
    "email": (email) => {
        if (!email.trim()) {
            return "This field is required";
        } else if (!/^\w+(\.?[^\s\.])+@\w+\.\w+$/.test(email)) {
            return "Invalid email address";
        } 
    }, 
    "query-type": () => "", // Just need to check if an option was selected
    "message": (message) => !message.trim() ? "This field is required": "",
    "consent": () => ""
};
 

function validateForm(data, validations) {
    const errors = {};
    for (let i=0; i<Object.keys(validations).length; i++) {
        let name = Object.keys(validations)[i];
        let error = validations[name](data[name]);
        if (!(name in data) || error) {
            let error_msg = !(name in data) ? "This field is required": error;
            errors[i] = error_msg;
        } 
    }
    return errors;
}

function goToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function handleSubmit(e, validations, errorElements) {
    e.preventDefault();    

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const errors = validateForm(data, validations);

    
    if (!Object.keys(errors).length) {
        e.target.reset();
        toastMessage.classList.add("toast-message-slidedown-animation");
        toastMessage.classList.remove("hidden");
        goToTop();

    }

    // Handle Error <span> elements
    errorElements.forEach((element, index) => {
        
        if (index in errors) {
            
            errorElements[index].classList.remove("hidden");
            errorElements[index].textContent = errors[index];
        } else {    
            
            errorElements[index].classList.add("hidden");
            errorElements[index].textContent = "";
        }
    });
    
}

form.addEventListener("submit", (e) => {
    handleSubmit(e, validations, errorElements)
});