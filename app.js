// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getDatabase,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV3gdoViVgvimAhLcSIGRxUZDozEqUaEE",
  authDomain: "projecttwo-c0556.firebaseapp.com",
  projectId: "projecttwo-c0556",
  storageBucket: "projecttwo-c0556.appspot.com",
  messagingSenderId: "728769033976",
  appId: "1:728769033976:web:42b7b50729f55c12652d0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

console.log(dbRef);

// Firebase ^^^^^

// add an overlay to the body and create this overlay in JS
// target body and store in var
// create overlay element for body
// add a class to the div
// append overlay to the body

const bodyEl = document.querySelector("body");

const overlayEl = document.createElement("div");

overlayEl.classList.add("overlay");

bodyEl.appendChild(overlayEl);

// when we click the cartIcon we want the cartApp to appear
// we want to target the cartIcon and save it in a variable
// to target an element on the DOM we use document.queryselector

const cartIconEl = document.querySelector(".cartIcon");
// target the cartApp and save it in variable
const cartAppEl = document.querySelector(".cartApp");
// define a function to toggle the cart
function toggleCart() {
  cartAppEl.classList.toggle("activated");
  overlayEl.classList.toggle("activated");
}
// add an eventListener inside the eventListener we pass two things, we pass and event and a callback function
cartIconEl.addEventListener("click", toggleCart);
// display cartApp
// if we use a class name we dont use a period before a class name
// classList allow us to manipulate the css

// when the cart app is open we want to target the X icon so that the cartApp closes and save the information in a variable
const closeIconEl = document.querySelector(".closeCart");
closeIconEl.addEventListener("click", toggleCart);
// toggle close the cartApp
//   cartAppEl.classList.toggle("activated");

// when the user clicks on the contShop the cartApp should close
// target the continue shopping anchor and save it in a variable
const contShopEl = document.querySelector(".contShop");

// toggle close the cartApp
contShopEl.addEventListener("click", toggleCart);

// when the user clicks on the window outside of the cart, the cart should dissapear

// attatch an eventListener to the window
window.addEventListener("click", function (e) {
  if (
    cartAppEl.classList.contains("activated") &&
    // if the cart is activated
    !cartAppEl.contains(e.target) &&
    // if cartAppEl doesnt contain a click || if the user doesnt click inside the cart
    !cartIconEl.contains(e.target) &&
    // if cartIconEl doesnt contain click
    ![...buttonCartEl].some((button) => button.contains(event.target))
    // ... is called a spread operator
    // if the user doesnt click on any of the buttons i want to toggle the cart
  ) {
    toggleCart();
  }
  // if () {
  // 3 conditons inside smooth brackets
  // if the cart is active
  // if the user clicks outside of the cart you want the cartApp to close
  // if the user is clicking anywhere on the screen that isnt the cartIcon
  // exclude elements that activate the cart or keep the cart active
  // all of these conditions need to met in order for our eventListener to work
  // }
  // run if statements with conditions
});

// whenever a user clicks any add to cart button, cartApp should open(toggle) *****
// target the add to cart button and save it to a variable
// query selectorAll to target all buttons
// use forEach method, run a function(toggle) for each button

const buttonCartEl = document.querySelectorAll(".buttonCart");
const emptyCartEl = document.querySelector(".emptyCart");
const fullCartEl = document.querySelector(".fullCart");
const inCartItems = [];

buttonCartEl.forEach((buttonCart) => {
  buttonCart.addEventListener("click", function (e) {
    toggleCart();
    emptyCartEl.style.display = "none";
    fullCartEl.style.display = "block";
    const id = e.target.id;
    console.log(id);
    const itemId = `item${id}`;
    console.log(itemId);

    const childRef = ref(database, `items/${itemId}`);
    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const itemData = snapshot.val();
          // console.log(itemData);
          const currentQty = itemData.quantity;
          // console.log(currentQty);
          const newQty = currentQty + 1;
          // console.log(newQty);
          inCartItems[itemId] = { ...itemData, quantity: newQty };
          // console.log(inCartItems[itemId]);
          // console.log(inCartItems);
          update(childRef, {
            inCart: true,
            quantity: newQty,
          });
          renderCartItems(Object.values(inCartItems));
        } else {
          console.log(`Item ${itemId} does not exist in the database.`);
        }
      })
      .catch((error) => {
        console.log("Error retrieving data:", error);
      });
  });
});

const productsInCartEl = document.querySelector(".productsInCart");
function renderCartItems(cartItemsArray) {
  productsInCartEl.innerHTML = "";
  cartItemsArray.forEach((item) => {
    const productInCartContainer = document.createElement("li");
    productInCartContainer.classList.add("productInCartContainer");
    productsInCartEl.append(productInCartContainer);

    const img = document.createElement("img");
    img.classList.add("productImage");
    img.src = item.imgSrc;
    productInCartContainer.append(img);

    const productInfoContainer = document.createElement("div");
    productInfoContainer.classList.add("productInfoContainer");
    productInCartContainer.append(productInfoContainer);

    const productTextContainer = document.createElement("div");
    productTextContainer.classList.add("productTextContainer");
    productInfoContainer.append(productTextContainer);

    const productName = document.createElement("p");
    productName.classList.add("productName");
    productName.textContent = item.name;

    productTextContainer.append(productName);

    const productPrice = document.createElement("p");
    productPrice.classList.add("productPrice");
    productPrice.textContent = item.price;

    productTextContainer.append(productPrice);

    const productBtnContainer = document.createElement("div");
    productBtnContainer.classList.add("productBtnContainer");
    productInfoContainer.append(productBtnContainer);

    const qtyContainer = document.createElement("div");
    qtyContainer.classList.add("qtyContainer");
    productBtnContainer.append(qtyContainer);

    const minusBtn = document.createElement("button");
    minusBtn.classList.add("minusBtn");
    minusBtn.textContent = "-";
    minusBtn.id = `-${item.id}`; // Use item ID in the button's ID attribute

    qtyContainer.append(minusBtn);

    const productQty = document.createElement("p");
    productQty.classList.add("productQty");
    productQty.textContent = item.quantity; // Update the quantity

    qtyContainer.append(productQty);

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("plusBtn");
    plusBtn.textContent = "+";
    plusBtn.id = `+${item.id}`; // Use item ID in the button's ID attribute

    qtyContainer.append(plusBtn);

    const trashIcon = document.createElement("p");
    trashIcon.classList.add("trashIcon");
    trashIcon.textContent = "Remove";
    trashIcon.id = `i${item.id}`; // Set the ID attribute with the item ID

    productBtnContainer.append(trashIcon);

    // const productInCartContainer = document.createElement("li");
    // productInCartContainer.classList.add("productInCartContainer");
    // productInCartContainer.innerHTML = `
    //         <img class="productImage" src="${item.imgSrc}" alt="${item.name}">
    //         <div class="productInfoContainer">
    //           <div class="productTextContainer">
    //             <p class="productName">${item.name}</p>
    //             <p class="productPrice">${item.price}</p>
    //           </div>
    //           <div class="productBtnContainer">
    //             <div class="qtyContainer">
    //               <button class="minusBtn" id="-${item.id}">-</button>
    //               <p class="productQty">${item.quantity}</p>
    //               <button class="plusBtn" id="+${item.id}">+</button>
    //             </div>
    //             <p class="trashIcon" id="$i{item.id}">Remove</p>
    //           </div>
    //         </div>
    //       `;
  });
}

// const productsInCartEl = document.querySelector(".productsInCart");

// function renderCartItems(cartItemsArray) {
//   productsInCartEl.innerHTML = "";

//   cartItemsArray.forEach((item) => {
//     const productInCartContainer = document.createElement("li");
//     productInCartContainer.classList.add("productInCartContainer");
//     productInCartContainer.innerHTML = `
//         <img class="productImage" src="${item.imgSrc}" alt="${item.name}">
//         <div class="productInfoContainer">
//           <div class="productTextContainer">
//             <p class="productName">${item.name}</p>
//             <p class="productPrice">${item.price}</p>
//           </div>
//           <div class="productBtnContainer">
//             <div class="qtyContainer">
//               <button class="minusBtn" id="-${item.id}">-</button>
//               <p class="productQty">${item.quantity}</p>
//               <button class="plusBtn" id="+${item.id}">+</button>
//             </div>
//             <p class="trashIcon" id="$i{item.id}">Remove</p>
//           </div>
//         </div>
//       `;
//     productsInCartEl.appendChild(productInCartContainer);
//   });
// }

// ref is a function that takes two arguments, the first argument is the database that we want to access, the second argument is the path we want to take
// the get function retrieves the data from firebase, the get function returns a promise, if the promise is fulfilled then wanna do something
// if the snapshot exists we want to see it

// remove the cart empty p when mixed vegs is added to cartApp and the continueshopping p
// increment +1 to the cartIcon
// create a ul
// add the mixedvegs to the cart in a ul and show increment of +1
