import * as userDB from '../db/userDB.js'
import * as Controller from "./Controller.js";
  
const logOut = document.getElementById("logOut");
const users = document.getElementById("users");
const products = document.getElementById("products");
const Settings = document.getElementById("Settings");
const orders = document.getElementById("orders");
const Dashboard = document.getElementById("Dashboard");
const mainNavigation = document.getElementById("mainNavigation");

window.onhashchange = renderPage;
window.addEventListener('load', function(e) { 
  setPermition();
  logOut.addEventListener('click', function (e) {
    userDB.logout();
  });
  users.addEventListener('click', function (e) {
    navigateTo('users');
  });
  products.addEventListener('click', function (e) {
    navigateTo('products');
  });
  orders.addEventListener('click', function (e) {
    navigateTo('orders');
  });
  Settings.addEventListener('click', function (e) {
    navigateTo('Settings');
  });
  Dashboard.addEventListener('click', function (e) {
    navigateTo('Dashboard');
  });
  renderPage();
})

const setPermition = function() {
  let role = atob( localStorage.getItem(btoa('role')));
  if(!(Controller.root.users.r.toLowerCase().includes(role)))users.style.display = 'none';
  if(!(Controller.root.products.r.toLowerCase().includes(role)))products.style.display = 'none';
  if(!(Controller.root.orders.r.toLowerCase().includes(role)))orders.style.display = 'none';
  if(!(role.toLowerCase().trim() == "admin"))Dashboard.style.display = 'none';
}
const pages = {
  users: "../../screens/panel/component.html",
  products: "../../screens/panel/component.html",
  orders: "../../screens/panel/component.html",
  Settings: "../../screens/panel/settings.html",
  Dashboard: "../../screens/panel/dashboard.html",
};

function navigateTo(page) {
  window.location.href = `#${page}`;
}


async function renderPage() {
  let dfPage = '';
  let role = atob( localStorage.getItem(btoa('role')));
  if(role.toLowerCase().trim() == "admin"){
    dfPage = 'Dashboard';
  }else if(role.toLowerCase().trim() == "seller"){
    dfPage = 'products';
  }else if(role.toLowerCase().trim() == "buyer"){
    dfPage = 'orders';
  }
  if(!window.location.hash.slice(1)){
    window.location.href = `#${dfPage}`;
  } 
  const AfterHash = window.location.hash.slice(1) || dfPage;
  const url = pages[AfterHash];
  let navs = document.getElementsByClassName('nav-link');
  for (const element of navs) {
    element.classList.remove('active');
  };
    let choosenNav = document.getElementById(AfterHash);
    choosenNav.classList.add('active');
  try {
    let included = document.getElementsByClassName('included');
    if(included.length>0){
      for (const sc of included) {
          sc.remove();
      }
    }
    const response = await fetch(url);
    const content = await response.text();
    mainNavigation.innerHTML = content;
    let scripts = document.querySelectorAll('#mainNavigation script');
    for (const el of scripts) {
      let newScript = document.createElement('script');
      newScript.type = "module";
      newScript.className = "included";
      newScript.src = el.src + "?v="+Date.now() ;
      document.head.appendChild(newScript);
    }
  } catch (error) {     
    mainNavigation.innerHTML =
      `<h1>404</h1><p>Page not found!</p><p>${error}</p>`;
  }
}