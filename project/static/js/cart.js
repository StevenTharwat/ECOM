import * as userDB from './db/userDB.js'
import * as ordersDB from './db/ordersDB.js'
// DOM Elements
const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");

// Tax rate
const TAX_RATE = 0.05;

// Render cart items
function renderTheOrder() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length == 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Go to <a href="products.html">products page</a> to add items to your cart.</p>
            </div>
        `;
    updateOrderSummary(0);
    return; //exit here => will not go to  foreach
  }

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <img src="../static/images/uploads/${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="category">${item.cat}</div>
                </div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', ${
      item.quantity - 1
    })">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', ${
      item.quantity + 1
    })">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  });

  updateOrderSummary(subtotal);
}

// Update cart summary
function updateOrderSummary(subtotal) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update item quantity in local storage
window.updateQuantity = function (productId, newQuantity) {
  if (newQuantity < 1) return;

  const itemIndex = cart.findIndex((item) => item.id == productId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart)); //replace existing in local storge
    renderTheOrder();
    updateCartCount();
  }
};

// Remove item from cart
window.removeFromCart = function (productId) {
  cart = cart.filter((item) => item.id != productId);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderTheOrder();
  updateCartCount();
};

// Clear cart
clearCartButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderTheOrder();
    updateCartCount();
  }
});

// Checkout process
checkoutButton.addEventListener("click", async () => {
  while (!(await userDB.isLogged())) {
    alert("Please log in to checkout");
    window.location.href = "login.html";
    return;
  }
  
  if(cart.length == 0){
    alert("Your cart is empty. Please add items to your cart before checking out.");
    return;}
    
    try {
      let id = atob( localStorage.getItem("login"));
      debugger
      for (const item of cart) {
        let order = new ordersDB.Order(
        null,
        item.id,
        item.name,
        item.quantity,
        null,
        item.sellerId,
        item.sellerName,
        null,
        null
      );
      await ordersDB.add(order);
    }
    console.log(cart);
    
    localStorage.removeItem("cart");
    window.location.href = "cart.html";
    alert("Order has been successfully submitted.");
    window.location.href = "panel/adminP.html#orders";
  } catch (e) {
    console.log(`can not send orde to db :: ${e}`);
    alert("There was an error submitting your order. Please try again.");
  }
});

// 1-Initialize cart on page load
document.addEventListener("DOMContentLoaded", async () => {
    let id = atob( localStorage.getItem("login"));
      let data = await userDB.get(id);
  
      if(id){
          document.getElementById('userLogin').innerText = data[0].name;
          document.getElementById('loginA').href = '../index.html'
      }
     document.getElementById('logOutA').addEventListener('click', function(e){
          userDB.logout();
          window.location.href = 'login.html';
      });
  renderTheOrder();
  updateCartCount();
});
