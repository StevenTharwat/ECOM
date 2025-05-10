// Simulate data for the dashboard
const dashboardData = {
    stats: {
      users: { count: 125, change: 12 },
      products: { count: 84, change: -3 },
      orders: { count: 216, change: 8 },
      items: { count: 359, change: 5 },
    },
  };

  const init = function () {
    setPermition();
    // Set the stats values
    document.getElementById("users-count").textContent =
      dashboardData.stats.users.count;
    document.getElementById("products-count").textContent =
      dashboardData.stats.products.count;
    document.getElementById("orders-count").textContent =
      dashboardData.stats.orders.count;
    document.getElementById("items-count").textContent =
      dashboardData.stats.items.count;

    // Set the stats changes
    setStatChange("users-change", dashboardData.stats.users.change);
    setStatChange("products-change", dashboardData.stats.products.change);
    setStatChange("orders-change", dashboardData.stats.orders.change);
    setStatChange("items-change", dashboardData.stats.items.change);

    // Refresh button click handler
    document
      .getElementById("refresh-btn")
      .addEventListener("click", function () {
        // Simulate data refresh
        alert("Data refreshed successfully!");
      });
  };

  const setPermition = function() {
    let role = atob( localStorage.getItem(btoa('role')));
   if(!(role.toLowerCase().trim() == "admin"))document.getElementById('mainNavigation').innerHTML = 'Not Found';
  }

  function setStatChange(elementId, change) {
    const element = document.getElementById(elementId);
    if (change > 0) {
      element.classList.add("positive");
      element.innerHTML = `<span>↑</span> ${change}% from last month`;
    } else {
      element.classList.add("negative");
      element.innerHTML = `<span>↓</span> ${Math.abs(
        change
      )}% from last month`;
    }
  }

  init();