import * as userDB from './db/userDB.js'
// Form Elements
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const submitBtn = contactForm.querySelector('button[type="submit"]');

// Error Elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

// Input animations
const inputs = document.querySelectorAll(".form-control");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("focused");
    if (input.value.trim()) {
      input.parentElement.classList.add("has-value");
    } else {
      input.parentElement.classList.remove("has-value");
    }
  });
});

// Validation Functions
function validateName() {
  const value = nameInput.value.trim();
  if (!value) {
    showError(nameInput, nameError, "Please enter your name");
    return false;
  }
  if (value.length < 2) {
    showError(nameInput, nameError, "Name must be at least 2 characters long");
    return false;
  }
  hideError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    showError(emailInput, emailError, "Please enter your email address");
    return false;
  }
  if (!emailRegex.test(value)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    return false;
  }
  hideError(emailInput, emailError);
  return true;
}

function validateSubject() {
  const value = subjectInput.value.trim();
  if (!value) {
    showError(subjectInput, subjectError, "Please enter a subject");
    return false;
  }
  if (value.length < 5) {
    showError(
      subjectInput,
      subjectError,
      "Subject must be at least 5 characters long"
    );
    return false;
  }
  hideError(subjectInput, subjectError);
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (!value) {
    showError(messageInput, messageError, "Please enter your message");
    return false;
  }
  if (value.length < 10) {
    showError(
      messageInput,
      messageError,
      "Message must be at least 10 characters long"
    );
    return false;
  }
  hideError(messageInput, messageError);
  return true;
}

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("show");
  input.classList.add("error");
}

function hideError(input, errorElement) {
  errorElement.classList.remove("show");
  input.classList.remove("error");
}

// Form Submit Handler
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      // Simulate API call (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showNotification(
        "success",
        "Message sent successfully! We'll get back to you soon."
      );
      contactForm.reset();
      inputs.forEach((input) => {
        input.parentElement.classList.remove("has-value");
      });
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification(
        "error",
        "Error sending message. Please try again later."
      );
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
  }
});

// Real-time validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
subjectInput.addEventListener("input", validateSubject);
messageInput.addEventListener("input", validateMessage);

// Notification system
function showNotification(type, message) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <p>${message}</p>
    `;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add("show"), 10);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Initialize menu state
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
  const MenuItems = document.getElementById("MenuItems");
  MenuItems.style.maxHeight = "0px";
});

// Make menutoggle function available globally
window.menutoggle = menutoggle;
