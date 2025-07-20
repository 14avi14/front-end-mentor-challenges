const shareBtn = document.getElementById("share-checkbox");
const socialNav = document.querySelector(".socials");


shareBtn.addEventListener("change", function() {
	if (this.checked) {
		socialNav.style.visibility = "visible";
	} else {
		socialNav.style.visibility = "hidden";
	}
});