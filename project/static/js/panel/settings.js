// Simulate a user database
const userData = {
    name: "Steven",
    address: "5st cairo egypt",
    email: "steven@example.com",
    pass: "123",
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Set initial values
    document.getElementById("name").value = userData.name;
    document.getElementById("address").value = userData.address;
    document.getElementById("email").value = userData.email;

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

        if (!email) {
          showError("email-error", "Email is required");
          isValid = false;
        } else if (!isValidEmail(email)) {
          showError("email-error", "Please enter a valid email address");
          isValid = false;
        } else {
          hideError("email-error");
        }

        // If form is valid, save the data
        if (isValid) {
          // Update user data
          userData.name = name;
          userData.address = address;
          userData.email = email;

          // Show save indicator
          const saveIndicator = document.querySelector(".save-indicator");
          saveIndicator.style.display = "flex";

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
        } else if (currentPassword !== userData.pass) {
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
        } else if (newPassword.length < 6) {
          showError(
            "new-password-error",
            "Password must be at least 6 characters"
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
          // Update user password
          userData.pass = newPassword;

          // Clear password fields
          document.getElementById("current-password").value = "";
          document.getElementById("new-password").value = "";
          document.getElementById("confirm-password").value = "";

          // Show save indicator
          const saveIndicator = document.querySelector(
            ".password-save-indicator"
          );
          saveIndicator.style.display = "flex";

          // Hide save indicator after 3 seconds
          setTimeout(function () {
            saveIndicator.style.display = "none";
          }, 3000);
        }
      });
  });

  // Helper functions
  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(id) {
    document.getElementById(id).style.display = "none";
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }