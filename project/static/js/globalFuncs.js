//common components
const menuItemsUl = document.querySelector("#MenuItems");
menuItemsUl.style.maxHeight = "0px"; //hidden by default



//common functions
function menutoggle() {
  if (menuItemsUl.style.maxHeight == "0px") {
    menuItemsUl.style.maxHeight="200px";
  } else {
    menuItems.style.maxHeight = "0px";
  }
} 

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

//make  global
window.updateCartCount = updateCartCount;

//call after loading 
document.addEventListener('DOMContentLoaded',updateCartCount);