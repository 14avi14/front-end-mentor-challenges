const formPageEl = document.querySelector(".sign-up-form-page");
const formEl = document.getElementById("form");
const emailErrorEl = document.getElementById("email-error");
const successPageEl = document.querySelector(".success-message-page");
const userEmailEl = document.getElementById("user-email");
const dismissMessageButton = document.getElementById("dismiss-msg-btn");




function handleSubmit(e) {
	e.preventDefault();

	const formData = new FormData(e.target);
	const {email} = Object.fromEntries(formData);

	const emailErrorMessage = verifyEmail(email);

	emailErrorEl.textContent = emailErrorMessage;

	if (!emailErrorMessage) {
		formPageEl.style.display = "none";
		successPageEl.style.display = "block";
		

		userEmailEl.textContent = email; // Customize the success page 
		e.target.reset(); // Reset form inputs 
	}	
}

function verifyEmail(email) {
	const emailRegex = /^\w+(\.?[^\.]+)+@\w+\.\w+$/; // 
	if (!emailRegex.test(email)) { // Return if email pattern doesn't match 
		return "Valid email required";
	}

	return "";
}



formEl.addEventListener("submit", handleSubmit);

dismissMessageButton.addEventListener("click", function() { 
	// After dismissing message, revert back to form page
	formPageEl.style.display = "block";
	successPageEl.style.display = "none";
});

