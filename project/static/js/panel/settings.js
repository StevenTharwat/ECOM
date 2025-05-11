import * as userDB from "../db/userDB.js";
let localStorageId ;
let Data ;
  const init = async function () {
    debugger
    localStorageId = atob( localStorage.getItem('login'));
    if(localStorageId) Data = await userDB.getUserById(localStorageId);
    // Set initial values
    document.getElementById("name").value = Data.name;
    document.getElementById("address").value = Data.address;
    document.getElementById("email").value = Data.email;

    // Handle form submission
    document
      .getElementById("profile-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();

        // Validate form
        let isValid = true;

        if (!name) {
          showError("name-error", "Name is required");
          isValid = false;
        } else {
          hideError("name-error");
        }

        if (!address) {
          showError("address-error", "Address is required");
          isValid = false;
        } else {
          hideError("address-error");
        }

        // If form is valid, save the data
        if (isValid) {
          // Update user data
          Data.name = name;
          Data.address = address;

          // Show save indicator
          const saveIndicator = document.querySelector(".save-indicator");
          saveIndicator.style.display = "flex";

          userDB.Update(Data);

          // Hide save indicator after 3 seconds
          setTimeout(function () {
            saveIndicator.style.display = "none";
          }, 3000);
        }
      });

    // Handle password form submission
    document
      .getElementById("password-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const currentPassword =
          document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword =
          document.getElementById("confirm-password").value;

        // Validate form
        let isValid = true;

        if (!currentPassword) {
          showError(
            "current-password-error",
            "Current password is required"
          );
          isValid = false;
        } else if (currentPassword !== Data.pass) {
          showError(
            "current-password-error",
            "Current password is incorrect"
          );
          isValid = false;
        } else {
          hideError("current-password-error");
        }

        if (!newPassword) {
          showError("new-password-error", "New password is required");
          isValid = false;
        } else if (newPassword.length < 3) {
          showError(
            "new-password-error",
            "Password must be at least 3 characters"
          );
          isValid = false;
        } else {
          hideError("new-password-error");
        }

        if (!confirmPassword) {
          showError(
            "confirm-password-error",
            "Please confirm your password"
          );
          isValid = false;
        } else if (confirmPassword !== newPassword) {
          showError("confirm-password-error", "Passwords do not match");
          isValid = false;
        } else {
          hideError("confirm-password-error");
        }

        // If form is valid, save the password
        if (isValid) {
          debugger
          // Update user password
          Data.pass = newPassword;

          // Clear password fields
          document.getElementById("current-password").value = "";
          document.getElementById("new-password").value = "";
          document.getElementById("confirm-password").value = "";

          // Show save indicator
          const saveIndicator = document.querySelector(
            ".password-save-indicator"
          );
          saveIndicator.style.display = "flex";
          userDB.Update(Data);
          // Hide save indicator after 3 seconds
          setTimeout(function () {
            saveIndicator.style.display = "none";
          }, 3000);
        }
      });
  };

  // Helper functions
  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(id) {
    document.getElementById(id).style.display = "none";
  }

  init();