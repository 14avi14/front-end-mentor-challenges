// Get the article time-spent sections
const timeSpentSections = document.querySelectorAll(".time-spent");
const timeframeRadioBtns = document.getElementsByName("timeframe-radio-buttons");

// Get main element to toggle loadingData "animation"
const mainEl = document.querySelector("main");



let timeframe = "weekly";


// Event listeners 
for (const btn of timeframeRadioBtns) {
    btn.addEventListener("change", function() {
        if (this.checked && dataObj) { // Make sure data is actually loaded
            timeframe = this.id;
            mainEl.classList.add("loading");
        }
    });
}

mainEl.addEventListener("animationend", function() {
    this.classList.remove("loading");
    setTimeSections(dataObj, timeframe);
});


// Get JSON data
let dataObj = null;


const fetchPromise = fetch("data.json");
fetchPromise.then((response) => {
    return response.json();
}).then((data) => {
    dataObj = data;
    setTimeSections(dataObj, timeframe);
}).catch((error) => {
    console.log(`There was an error fetching the data: ${error}`);
});


// Function to set the new values of the time sections

function setTimeSections(data, timeframe) {
    // Set the lastTimeInterval: `Yesterday`, `Last Week` or `Last Month`
    let lastTimeInterval = "Yesterday";
    if (timeframe === "weekly") {
        lastTimeInterval = "Last Week";
    } else if (timeframe === "monthly") {
        lastTimeInterval = "Last Month";
    }

    for (let i=0; i<data.length;i++) {
        let currentHoursEl = timeSpentSections[i].querySelector(".current");
        let previousHoursEl = timeSpentSections[i].querySelector(".previous");

        let currentHours = data[i].timeframes[timeframe].current;
        let suffix = currentHours == 1 ? "hr": "hrs";
        currentHoursEl.textContent = `${currentHours}${suffix}`

        let previousHours = data[i].timeframes[timeframe].previous;
        suffix = previousHours == 1 ? "hr": "hrs";
        previousHoursEl.textContent = `${lastTimeInterval} - ${previousHours}${suffix}`
    }
}



