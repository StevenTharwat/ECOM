import * as productDB from "../db/productDB.js";
import * as userDB from "../db/userDB.js";
import * as ordersDB from "../db/ordersDB.js";


const getproductSellesCountCount = function(orders) {
  let res = 0
  for (const order of orders) {
    if (order.status == "delivered") {
      res += order.quantity;
    }
  }
  return res;
}

  const init = async function () {
    setPermition();
    const orders = await ordersDB.get();
const users = await userDB.get();
const products = await productDB.get();
    debugger
    // Set the stats values
    document.getElementById("users-count").textContent =
      users.length;
    document.getElementById("products-count").textContent =
      products.length;
    document.getElementById("orders-count").textContent =
      orders.length;
    document.getElementById("productSellesCount-count").textContent =
      getproductSellesCountCount(orders);

    // Refresh button click handler
    document
      .getElementById("refresh-btn")
      .addEventListener("click", function () {
        init();
        alert("Data refreshed successfully!");
      });
  };

  const setPermition = function() {
    let role = atob( localStorage.getItem(btoa('role')));
   if(!(role.toLowerCase().trim() == "admin"))document.getElementById('mainNavigation').innerHTML = 'Not Found';
  }

  init();