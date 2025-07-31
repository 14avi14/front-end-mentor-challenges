// Get Menu Button 
//  On click => Show menu, change img source to close button

const menuBtn = document.querySelector(".menu-btn");
const menuEl = document.querySelector(".header-menu-nav");
const shaderOverlay = document.querySelector(".overlay");

// Remove "hidden" class if desktop
if (window.innerWidth >= 1024) {
    menuEl.classList.remove("hidden");
}
menuBtn.addEventListener("click", (e) => {
    if (menuEl.classList.contains("hidden")) {
        // Make the menu visible
        menuEl.classList.remove("hidden");
        shaderOverlay.classList.remove("hidden");
        menuBtn.querySelector("img").src = "./images/icon-close.svg";
        menuBtn.style.position = "fixed";
    } else {
        menuEl.classList.add("hidden");
        shaderOverlay.classList.add("hidden");  
        menuBtn.querySelector("img").src = "./images/icon-menu.svg";
        menuBtn.style.position = "relative";
    }

});

// Get Cart Button
//  On Click => Show cart, show number of items selected
const cartBtn = document.querySelector(".show-cart-btn");
const cartPopUp = document.querySelector(".cart-dialog");
const cartPopUpContainer = document.querySelector(".cart-items-container");
const itemDisplayElCart = document.querySelector(".num-items-display-cart");
const checkoutBtn = document.getElementById("checkout-btn");

cartBtn.addEventListener("click", (e) => {
    if (cartPopUp.open) {
        cartPopUp.close();
    } else {
        cartPopUp.show();
    }
});

function addItemToCartPopUp(popup, numPurchased, individualCost, imgFileName, itemName) {
    const totalCost = numPurchased * individualCost;
    const itemEl = document.createElement("article");
    itemEl.innerHTML = `
        <img src="./images/${imgFileName}" alt="">
        <section class="cart-item-info">
            <p class="text-preset-2">${itemName}</p>
            <p class="text-preset-2">$${individualCost.toFixed(2)} x ${numPurchased} <strong>$${totalCost.toFixed(2)}</strong></p>    
        </section>
    `;

    itemEl.classList.add("cart-popup-item");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="./images/icon-delete.svg" alt="">`;
    deleteBtn.addEventListener("click", (e) => {
        // Remove itemEl from popup
        popup.removeChild(itemEl);
        updateCartPopupContainer();
    });

    itemEl.appendChild(deleteBtn);

    popup.appendChild(itemEl);
}

function updateCartPopupContainer() {
    itemDisplayElCart.textContent = cartPopUpContainer.childElementCount - 1; // Exclude cart empty message
    
    if (parseInt(itemDisplayElCart.textContent) === 0) {
        itemDisplayElCart.classList.add("hidden");
        checkoutBtn.classList.add("hidden");
        cartPopUpContainer.querySelector("p").classList.remove("hidden"); /* Show `cart is empty` message*/
    } else {
        itemDisplayElCart.classList.remove("hidden");
        checkoutBtn.classList.remove("hidden");
        cartPopUpContainer.querySelector("p").classList.add("hidden");
    }
}

function addShoesToCart(count) {
    addItemToCartPopUp(cartPopUpContainer, count, 125, "image-product-1.jpg", "Fall Limited Edition Sneakers");
    updateCartPopupContainer();
}

// Add/remove items buttons
// On click => 
// Update cart-btn dataset value and item-num display, 
// add elements to cartPopUp
//   function layout to use ----> 
const addItemsBtn = document.getElementById("add-items");
const removeItemsBtn = document.getElementById("remove-items");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const itemDisplayEl = document.querySelector(".num-items-display-main");
addItemsBtn.addEventListener("click", (e) => {
    itemDisplayEl.textContent = parseInt(itemDisplayEl.textContent) + 1;
});

removeItemsBtn.addEventListener("click", (e) => {
    const numItems = parseInt(itemDisplayEl.textContent);
    if (numItems > 0) {
        itemDisplayEl.textContent = numItems - 1;
    }
});

addToCartBtn.addEventListener("click", (e) => {
    const numItems = parseInt(itemDisplayEl.textContent);
    if (numItems > 0) {
        addShoesToCart(numItems);
        itemDisplayEl.textContent = 0; // Reset after purchase
    }
});


// Lightbox/Product images
//  Add arrow buttons
//  change image 
//      Store list of image srcs 
//      Store current Index
//  When big enough(computer size)
//      Add dialog 
//      Remove buttons from original container
//      Move buttons to dialog container

function createArrowBtns(imgFileName, direction, imageUpdateFunction) {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <img src="./images/${imgFileName}" alt="">
    `;

    btn.addEventListener("click", (e) => {
        index += direction; // Direction is either -1 or 1
        if (index < 0) { // If index negative
            index = productImagePaths.length - 1;
        } else if (index >= productImagePaths.length) { // If index bigger than number images
            index = 0;
        }

        imageUpdateFunction();
    });
    btn.classList.add("change-image-arrow-btns");
    return btn;
}

function updateImage(container) {
    const image = container.querySelector(".main-image");
    image.src = productImagePaths[index];
    image.classList.add("main-image");
}

function updateImagesMainAndLightBox() { 
    // Update both the lightbox and main images so we don't need a separate index variable
    updateImage(mainImageSection);
    updateImage(mainImageLightBox);

    updateThumbnailNavs(index);
}


let index = 0;
const productImagePaths = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
];


const imageDisplaySection = document.querySelector(".image-display-section");
const mainImageSection = imageDisplaySection.querySelector(".main-image-container");
const showLightBoxBtn = mainImageSection.querySelector("#show-lightbox-btn");

const lightBoxModal = document.querySelector(".lightbox-dialog");
const mainImageLightBox = lightBoxModal.querySelector(".main-image-container");
const closeLightBoxBtn = lightBoxModal.querySelector("#close-lightbox-btn");

const leftButton = createArrowBtns("icon-previous.svg", -1, updateImagesMainAndLightBox);
const rightButton = createArrowBtns("icon-next.svg", 1, updateImagesMainAndLightBox);

if (window.innerWidth < 768) {
    // NOTE: This does not update live, so if the screen 
    //       size changes(like with dev tools) then the buttons will still stay

    mainImageSection.appendChild(leftButton);
    mainImageSection.appendChild(rightButton);
} else {
    mainImageLightBox.appendChild(leftButton);
    mainImageLightBox.appendChild(rightButton);

    // Add event listeners to buttons for showing and closing lightbox 
    showLightBoxBtn.addEventListener("click", (e) => {
        lightBoxModal.showModal();
    });

    closeLightBoxBtn.addEventListener("click", (e) => {
        lightBoxModal.close();
    });
}


// Thumbnail Buttons
const thumbnailBtnsMain = imageDisplaySection.querySelectorAll(".thumbnail-btn");
const thumbnailBtnsLightBox = lightBoxModal.querySelectorAll(".thumbnail-btn");


function updateSelectedThumbnail(index, btnList) {
    btnList.forEach((btn, i) => {
        if (index == i) {
            btnList[i].classList.add("selected");
        } else {
            btnList[i].classList.remove("selected");
        }
    });
}

function updateThumbnailNavs(i) {
    updateSelectedThumbnail(i, thumbnailBtnsMain);
    updateSelectedThumbnail(i, thumbnailBtnsLightBox);
}

function handleThumbnailClick(indexBtn) {
    updateThumbnailNavs(indexBtn);

    index = indexBtn;
    updateImagesMainAndLightBox();
} 

thumbnailBtnsMain.forEach((btn, indexBtn) => {
    btn.addEventListener("click", function() {
        handleThumbnailClick(indexBtn);
    });
});

thumbnailBtnsLightBox.forEach((btn, indexBtn) => {
    btn.addEventListener("click", (e) => {
        handleThumbnailClick(indexBtn);
    });
});



