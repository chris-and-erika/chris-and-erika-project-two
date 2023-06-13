// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getDatabase,
  ref,
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
const dbRef = ref(database, "items");

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
window.addEventListener("click", function (event) {
  if (
    cartAppEl.classList.contains("activated") &&
    // if the cart is activated
    !cartAppEl.contains(event.target) &&
    // if cartAppEl doesnt contain a click || if the user doesnt click inside the cart
    !cartIconEl.contains(event.target) &&
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

buttonCartEl.forEach((buttonCart) => {
  buttonCart.addEventListener("click", function () {
    toggleCart();
    emptyCartEl.style.display = "none";
    fullCartEl.style.display = "block";
  });
  // remove the cart empty p when mixed vegs is added to cartApp and the continueshopping p
  // increment +1 to the cartIcon
  // create a ul
  // add the mixedvegs to the cart in a ul and show increment of +1
});
