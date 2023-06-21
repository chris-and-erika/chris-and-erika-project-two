// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3ns1VQvYSGOMuoyxUTUSWGNT5iR2TNzo",
  authDomain: "practice-project-app-608de.firebaseapp.com",
  projectId: "practice-project-app-608de",
  storageBucket: "practice-project-app-608de.appspot.com",
  messagingSenderId: "126461480563",
  appId: "1:126461480563:web:ebdcf28a19991bf790e406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const dbRef = ref(database);

const bodyEl = document.querySelector("body");
const overlayEl = document.createElement("div");
overlayEl.classList.add("overlay");
bodyEl.appendChild(overlayEl);

const cartIconEl = document.querySelector(".cartIcon");
const cartAppEl = document.querySelector(".cartApp");

function toggleCart() {
  cartAppEl.classList.toggle("activated");
  overlayEl.classList.toggle("activated");
}

cartIconEl.addEventListener("click", toggleCart);

const closeIconEl = document.querySelector(".closeCart");
closeIconEl.addEventListener("click", toggleCart);

const contShopEl = document.querySelector(".contShop");

contShopEl.addEventListener("click", toggleCart);

window.addEventListener("click", function(e) {
  if (
    cartAppEl.classList.contains("activated") &&
    !cartAppEl.contains(e.target) &&
    !cartIconEl.contains(e.target) &&
    ![...buttonCartEl].some((button) => button.contains(event.target))
  ) {
    toggleCart();
  }
});

const inCartItems = [];

const buttonCartEl = document.querySelectorAll(".buttonCart");
const emptyCartEl = document.querySelector(".emptyCart");
const fullCartEl = document.querySelector(".fullCart");

buttonCartEl.forEach((buttonCart) => {
  buttonCart.addEventListener("click", function(e) {
    toggleCart();
    emptyCartEl.style.display = "none";
    fullCartEl.style.display = "block";
    const itemId = e.target.id;

    const childRef = ref(database, `items/${itemId}`);
    get(childRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const itemData = snapshot.val();
          const currentQty = itemData.quantity;
          const newQty = currentQty + 1;
          let index = inCartItems.findIndex((item) => item.id === itemId);

          if (index !== -1) {
            inCartItems[index].quantity++;
          } else {
            const newItem = { ...itemData, quantity: newQty, id: itemId };
            inCartItems.push(newItem);
          }

          update(childRef, { inCart: true, quantity: newQty });
          updateCart();
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
    minusBtn.id = `${item.id}`; // Use item ID in the button's ID attribute
    qtyContainer.append(minusBtn);

    const productQty = document.createElement("p");
    productQty.classList.add("productQty");
    productQty.textContent = item.quantity; // Update the quantity
    qtyContainer.append(productQty);

    const plusBtn = document.createElement("button");
    plusBtn.classList.add("plusBtn");
    plusBtn.textContent = "+";
    plusBtn.id = `${item.id}`; // Use item ID in the button's ID attribute
    qtyContainer.append(plusBtn);

    const trashItem = document.createElement("p");
    trashItem.classList.add("trashItem");
    trashItem.textContent = "Remove ";
    trashItem.id = `${item.id}`; // Set the ID attribute with the item ID
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    trashItem.appendChild(trashIcon);
    productBtnContainer.append(trashItem);
  });
}

function handleClick(e) {
  const itemId = e.target.id;
  const item = inCartItems.find((item) => item.id === itemId);
  const productQtyEl = e.target.parentElement.querySelector(".productQty");

  if (item) {
    if (e.target.classList.contains("plusBtn")) {
      item.quantity++;
      productQtyEl.textContent = item.quantity;
    } else if (e.target.classList.contains("minusBtn")) {
      item.quantity--;
      productQtyEl.textContent = item.quantity;
      if (item.quantity === 0) {
        // productQtyEl.textContent = 0;
        removeItemFromCart(itemId);
        e.stopPropagation();
        return;
      }
    } else if (e.target.classList.contains("trashItem")) {
      removeItemFromCart(itemId);
      e.stopPropagation();
      return;
    }
    calculateTotalItemsInCart(inCartItems);
    calculatePrices(inCartItems)
    const childRef = ref(database, `items/${itemId}`);
    update(childRef, { quantity: item.quantity });
  }
}

function removeItemFromCart(itemId) {
  const index = inCartItems.findIndex((item) => {
    return item.id === itemId;
  });

  if (index !== -1) {
    inCartItems.splice(index, 1);
  }
  if (inCartItems.length === 0) {
    emptyCartEl.style.display = "flex";
    fullCartEl.style.display = "none";
  }
  updateCart()
  
  const childRef = ref(database, `items/${itemId}`);
  update(childRef, { inCart: false, quantity: 0 });
}

productsInCartEl.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("plusBtn") ||
    e.target.classList.contains("minusBtn") ||
    e.target.classList.contains("trashItem")
  ) {
    handleClick(e);
  }
});

function calculateTotalItemsInCart(inCartItems) {
  const totalItemsInCart = document.querySelector(".totalItemsInCart");
  const totalItems = document.createElement("p");
  totalItems.classList.add("totalItems");
  totalItemsInCart.innerHTML = "";
  totalItemsInCart.append(totalItems);

  const totalQty = inCartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  totalItems.textContent = totalQty;

  if (totalQty === 0) {
    totalItemsInCart.style.display = "none";
  } else if (totalQty > 0) {
    totalItemsInCart.style.display = "block";
  }
}

function calculatePrices(inCartItems) {
  const subTotalEl = document.querySelector(".subTotal");
  const totalTaxEl = document.querySelector('.totalTax');
  const totalPriceEl = document.querySelector('.totalPrice');

  const subTotal = inCartItems.reduce(function (total, item) {
    return total + item.quantity * item.price;
  }, 0);

  const totalTax = subTotal * 0.13;
  const totalPrice = subTotal + totalTax;

  subTotalEl.textContent = subTotal.toFixed(2);
  totalTaxEl.textContent = totalTax.toFixed(2);
  totalPriceEl.textContent = totalPrice.toFixed(2);
}

function clearTheCart() {
  const clearAllEl = document.querySelector('.clearTheCart');
  clearAllEl.addEventListener('click', function() {
    if (inCartItems.length > 0) {
      emptyCartEl.style.display = "flex";
      fullCartEl.style.display = "none";

      inCartItems.forEach((item) => {
        const id = item.id;
        const childRef = ref(database, `items/${id}`);
        update(childRef, { inCart: false, quantity: 0 });

        item.quantity = 0;
      });

      const clearToZero = document.querySelector('.totalItems');
      clearToZero.textContent = 0;
      clearToZero.style.display = "none";

      inCartItems.length = 0;

      updateCart();
    }
  });
}

clearTheCart();

function updateCart() {
  renderCartItems(inCartItems);
  calculateTotalItemsInCart(inCartItems);
  calculatePrices(inCartItems);
}



