import { app } from './firebase.js';
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const database = getDatabase(app);

//TOGGLING THE CART.

const bodyEl = document.querySelector("body");
const overlayEl = document.createElement("div");
overlayEl.classList.add("overlay");
bodyEl.appendChild(overlayEl);

const cartIconEl = document.querySelector(".cartIcon");
const cartAppEl = document.querySelector(".cartApp");
const closeIconEl = document.querySelector(".closeCart");
const contShopEl = document.querySelector(".contShop");

function toggleCart() {
  cartAppEl.classList.toggle("activated");
  overlayEl.classList.toggle("activated");
}

cartIconEl.addEventListener("click", toggleCart);
closeIconEl.addEventListener("click", toggleCart);
contShopEl.addEventListener("click", toggleCart);

window.addEventListener("click", function(e) {
  if (
    cartAppEl.classList.contains("activated") &&
    !cartAppEl.contains(e.target) &&
    !cartIconEl.contains(e.target) &&
    ![...buttonCartEl].some((button) => button.contains(e.target))
  ) {
    toggleCart();
  }
});

//ADDING ITEMS TO CART
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

//FUNCTION TO RENDER THE CART ITEMS.
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
    img.alt = item.description; // Replace with your desired alt text
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
    productBtnContainer.append(trashItem);
  });
}

//FUNCTION FOR THE PLUS, MINUS, AND REMOVE BUTTONS.
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
  updateCart();
  
  const childRef = ref(database, `items/${itemId}`);
  update(childRef, { inCart: false, quantity: 0 });
}

productsInCartEl.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("plusBtn") ||
    e.target.classList.contains("minusBtn") ||
    e.target.classList.contains("trashItem")
  ) {
    handleClick(e);
  }
});

//FUNCTION TO CALCULATE THE TOTAL ITEMS IN CART.
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

//FUNCTION TO CALCULATE SUBTOTAL, TAX, AND TOTAL PRICE. 
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

//FUNCTION TO CLEAR THE ITEMS FROM THE CART.
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

//FUNCTION TO UPDATE THE CART.
function updateCart() {
  renderCartItems(inCartItems);
  calculateTotalItemsInCart(inCartItems);
  calculatePrices(inCartItems);
}

//FUNCTION TO DISPLAY ITEMS SAVED IN CART ON PAGE REFRESH/LOAD. 
window.onload = function() {
  const dbRef = ref(database, 'items');
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const itemId in data) {
          const itemData = data[itemId];
          if (itemData.inCart) {
            inCartItems.push({ ...itemData, id: itemId });
            emptyCartEl.style.display = "none";
            fullCartEl.style.display = "block";
          }
        }
        renderCartItems(inCartItems);
        updateCart();
      } else {
        console.log('No items exist in the database.');
      }
    })
    .catch((error) => {
      console.log('Error retrieving data:', error);
    });
};










