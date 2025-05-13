import * as userDB from './db/userDB.js'
import * as productDB from './db/productDB.js'
// Sample product data using images from static/images
let sampleProducts;
let filteredProducts;

// DOM Elements
const productsGrid = document.getElementById("ProductFlex");
const pagination = document.querySelector("#pagination");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");

const productsPerPage = 8;
let currentPage = 1;

//fill cat dynamically 
function populateCategoryFilter(comingProducts) {
  const dynCatagories = [...new Set(comingProducts.map((pro) => pro.cat))];
  categoryFilter.innerHTML = '<option value="">All Categories</option>'; // Reset options
  debugger
  dynCatagories.forEach(dcat => {
    debugger
    const option = document.createElement("option");
    option.value = dcat;
    option.textContent = dcat.charAt(0).toUpperCase() + dcat.slice(1);
    categoryFilter.appendChild(option);
  });
}

function setupEventListeners() {
  // Search input
  searchInput.addEventListener("input", () => {
    applyFiltersAndSort();
  });

  // Category filter
  categoryFilter.addEventListener("change", () => {
    applyFiltersAndSort();
  });

  // Sort filter
  sortFilter.addEventListener("change", () => {
    applyFiltersAndSort();
  });
}

// Apply filters and sort
function applyFiltersAndSort() {
  let filtered = [...sampleProducts];
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value.toLowerCase();
  const sortOption = sortFilter.value;

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.cat.toLowerCase().includes(searchTerm)
    );
  }

  // Apply category filter
  if (category) {
    filtered = filtered.filter((product) => product.cat == category);
  }

  // Apply sorting
  switch (sortOption) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      filtered.sort((a, b) => a.id - b.id);
  }

  filteredProducts = filtered;
  console.log(`found filtered products  ${filteredProducts}`);
  currentPage = 1;
  renderProducts();
}

const addToCart = function (productId) {
  debugger
  const product = sampleProducts.find((p) => p.id == productId);
  if (product) {
    const existingItem = cart.find((item) => item.id == productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    debugger
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification("Product added to cart!");
  }
};

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Render products for current page
function renderProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  console.log(`current products ${currentProducts}`);

  productsGrid.innerHTML = "";

  currentProducts.forEach((product) => {
    const productHTML = `
                <div class="col-4">
                <div class="product-card">
                <img src="../static/images/uploads/${product.img}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                </div>
                <div class="product-details">
                <p class="price">$${product.price}</p>
                <button id="${product.id}" class="add-to-cart-btn" >
                <i class="fa fa-shopping-cart"></i> Add to Cart
                </button>
                </div>
                </div>
                </div>
                `;
    productsGrid.insertAdjacentHTML("beforeend", productHTML);
    document.getElementById(product.id).addEventListener("click", function () {
      addToCart(product.id);
    });
    //kareem=> safer because it directly inserts parsed HTML into the DOM, avoiding script execution risks associated with innerHTML
  });

  renderPagination();
}

function renderPagination() {
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const maxVisibleButtons = 5;
  const pageNumbers = document.getElementById("pageNumbers");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  // Enable/disable prev/next buttons
  prevBtn.disabled = currentPage == 1;
  nextBtn.disabled = currentPage == pageCount;

  //-- Calculate visible page range
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2)); //to go back 2 pages
  let endPage = Math.min(pageCount, startPage + maxVisibleButtons - 1); //to limit display 5 btns only(maxVisibleButtons)

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  // Clear existing page numbers
  pageNumbers.innerHTML = "";

  // if start page (current-2)
  if (startPage > 1) {
    addPageButton(1);
    if (startPage > 2) {
      addEllipsis();
    }
  }

  // Add page numbers
  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i);
  }

  // Add last page if not in range
  if (endPage < pageCount) {
    if (endPage < pageCount - 1) {
      addEllipsis();
    }
    addPageButton(pageCount);
  }

  // Update active state
  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.textContent) === currentPage);
  });

  function addPageButton(pageNum) {
    const button = document.createElement("button");
    button.className = `page-btn ${pageNum == currentPage ? "active" : ""}`;
    button.textContent = pageNum;
    button.onclick = () => changePage(pageNum);
    pageNumbers.appendChild(button);
  }

  function addEllipsis() {
    const span = document.createElement("span");
    span.className = "ellipsis";
    span.textContent = "...";
    pageNumbers.appendChild(span);
  }

  // Change page
  function changePage(page) {
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    if (page >= 1 && page <= pageCount) {
      currentPage = page;
      renderProducts();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // Add event listeners for prev/next buttons
  prevBtn.onclick = () => changePage(currentPage - 1);
  nextBtn.onclick = () => changePage(currentPage + 1);
}

// Initialize ::DOMContentLoaded=> fires before external resources
document.addEventListener("DOMContentLoaded", async () => {
  let id = atob( localStorage.getItem("login"));
  let idUnDecrpited = localStorage.getItem("login");
  if(idUnDecrpited ){
      let data = await userDB.get(id);
  

          document.getElementById('userLogin').innerText = data[0].name;
          document.getElementById('loginA').href = '../index.html'
      }
     document.getElementById('logOutA').addEventListener('click', function(e){
          userDB.logout();
          window.location.href = '../login.html';
      });
  setupEventListeners();
  sampleProducts = await productDB.get();
  filteredProducts = [...sampleProducts];
  populateCategoryFilter(filteredProducts);
  renderProducts();
  applyFiltersAndSort();

  window.updateCartCount();
});
