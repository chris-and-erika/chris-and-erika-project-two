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

// when we click the cartIcon we want the cartApp to appear
// we want to target the cartIcon and save it in a variable
// to target an element on the DOM we use document.queryselector

const cartIconEl = document.querySelector(".cartIcon");
// target the cartApp and save it in variable
const cartAppEl = document.querySelector(".cartApp");
// define a function to toggle the cart
function toggleCart() {
  cartAppEl.classList.toggle("activated");
}
// add an eventListener inside the eventListener we pass two things, we pass and event and a callback function
cartIconEl.addEventListener("click", function () {
  // display cartApp
  toggleCart();
  // if we use a class name we dont use a period before a class name
  // classList allow us to manipulate the css
});
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

// whenever a user clicks any add to cart button, cartApp should open(toggle) *****
// target the add to cart button and save it to a variable
// query selectorAll to target all buttons
// use forEach method, run a function(toggle) for each button

const buttonCart = document.querySelectorAll(".buttonCart");

buttonCart.forEach((buttonCart) => {
  buttonCart.addEventListener("click", toggleCart);
});

// when the user clicks on the window outside of the cart, the cart should dissapear

// attatch an eventListener to the window
window.addEventListener("click", function (event) {
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
