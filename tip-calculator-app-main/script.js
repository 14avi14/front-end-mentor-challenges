const form = document.getElementById("form");
const inputElements = document.querySelectorAll(".input-elements");
const outputElements = document.querySelectorAll(".output-elements");
const errorElements = form.querySelectorAll(".error-message");

const resetBtn = document.getElementById("reset-btn");



const tipRadioBtns = document.querySelectorAll(`input[type="radio"]`);
const customTipValueEl = document.getElementById("custom-tip-value");


function handleCustomTipChange(customTipEl, radioBtns, setName) {
    if (customTipEl.value) {
        customTipEl.name = setName;
        for (const el of radioBtns) {
            el.checked = false;
        }
    } else {
        customTipEl.name = "";
    }
}

function handleRadioBtnChange(radioBtn, customTipEl) {
    if (radioBtn.checked) {
        customTipEl.name = "";
        customTipEl.value = "";
    }
}

customTipValueEl.addEventListener("change", function() {
    // Change the name to "tips" so that it is registered on the form
    handleCustomTipChange(this, tipRadioBtns, "tips");

})

tipRadioBtns.forEach((btn) => {
    btn.addEventListener("change", function()  {handleRadioBtnChange(this, customTipValueEl)});
});

function resetElements(elements){
    for (const el of elements) {
        el.textContent = "";
        el.value = "";
        el.checked = false;
    }
}
function resetOutput(elements) {
    for (const el of elements) {
        el.textContent = "$0.00";
        el.value = "";
        el.checked = false;
    } 
}

function moreThanZero(val) {
     if (val == 0 && val !== "") {
        return "Can't be zero";
    } else if (val < 0) {
        return "Invalid";
    }
    return "";
}

function isInteger(val) {
    return val - Math.trunc(val) === 0;
}

const validations = {
    bill: (bill) => {
        if (bill < 0) {
            return "Can't be less than zero";
        }
    },
    tips: (tip) => {
        if (tip < 0) {
            return "Invalid";
        }
        return "";
    },
    "num-people": (numPeople) => {
        let morethanzero = moreThanZero(numPeople);
        if (morethanzero) {
            return morethanzero;
        } else if (!isInteger(numPeople)){
            return "Invalid";
        } else {
            return "";
        }
    }
};

const calculations = {
    0: (dataObj) => {
        return calculateTipPerPerson(dataObj["bill"], dataObj["tips"], dataObj["num-people"])
    },
    1: (dataObj) => {
        return calculateTotalPerPerson(dataObj["bill"], dataObj["tips"], dataObj["num-people"])
    }
}



function calculateTipPerPerson(bill, tipPercentage, numPeople) {

    return numPeople != 0 ? (bill * (tipPercentage/100)) / numPeople: 0;
}

function calculateTotalPerPerson(bill, tipPercentage, numPeople) {
    return numPeople != 0 ? (bill * (1 + tipPercentage/100)) / numPeople: 0;
}

function validKeyValue(key, value, validations) {
    return !validations[key] || validations[key](value);
}



function validateForm(dataObj, validations) {
    const errors = {};

    for (const key of Object.keys(dataObj)) {
        let error = validKeyValue(key, dataObj[key], validations);
        errors[key] = error;
    }

    return errors;

}



function renderErrors(errors, errorElements, inputElements) {
    let keys = Object.keys(errors);
    let numErrors = 0;
    for (let i=0; i<keys.length; i++) {
        errorElements[i].textContent = errors[keys[i]];
        if (errors[keys[i]]) {
            inputElements[i].classList.add("input-error");
            numErrors++;
        } else {
            inputElements[i].classList.remove("input-error");
        }
    }

    return numErrors;
}

function updateOutput(outputElements, dataObj, calculations) {
    for (let i=0; i<outputElements.length;i++) {
        let output = calculations[i](dataObj);
        // Round to two decimal places
        outputElements[i].textContent = `$${output.toFixed(2)}`; 
    }
}

function updateDOM(form, validations, calculations, errorElements, inputElements, outputElements, resetBtn) {
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData);
    const errors = validateForm(dataObj, validations); // Object with error messages

    if (!renderErrors(errors, errorElements, inputElements)) { // Will return zero if all error messages were ""
        updateOutput(outputElements, dataObj, calculations);
        resetBtn.disabled = false;
    }


}

form.addEventListener("change", (e) => {
    e.preventDefault();
    updateDOM(e.currentTarget, validations, calculations, errorElements, inputElements, outputElements, resetBtn);
});

resetBtn.addEventListener("click", function() {
    
    resetElements(inputElements);
    resetElements(tipRadioBtns);
    tipRadioBtns[0].checked = true;
    resetOutput(outputElements);
    resetElements(errorElements);
    //updateDOM(form, validations, calculations, errorElements, inputElements, outputElements, resetBtn);
    this.disabled = true;
});