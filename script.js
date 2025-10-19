const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

// ✅ Create success popup dynamically
const popup = document.createElement("div");
popup.id = "successPopup";
popup.innerHTML = `
  <div class="popup-content">
    <p>✅ Registration Successful!</p>
    <button id="closePopup">OK</button>
  </div>
`;
document.body.appendChild(popup);

const closePopupBtn = document.getElementById("closePopup");

form.addEventListener("submit", function (event) {
  if (!ValidateInputs()) {
    event.preventDefault();
    return;
  }

  event.preventDefault();

  // ✅ Show popup
  popup.style.display = "flex";

  // Reset the form
  form.reset();

  // Optional: Auto-hide popup after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
});

// ✅ Close popup manually
closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

function ValidateInputs() {
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();
  const cpasswordVal = cpassword.value.trim();
  let success = true;

  if (usernameVal === "") {
    success = false;
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (emailVal === "") {
    success = false;
    setError(email, "Email is required");
  } else if (!ValidateEmail(emailVal)) {
    success = false;
    setError(email, "Please enter a valid email");
  } else {
    setSuccess(email);
  }

  if (passwordVal === "") {
    success = false;
    setError(password, "Password is required");
  } else if (passwordVal.length < 8) {
    success = false;
    setError(password, "Password must be at least 8 characters long");
  } else {
    setSuccess(password);
  }

  if (cpasswordVal === "") {
    success = false;
    setError(cpassword, "Confirm password is required");
  } else if (cpasswordVal !== passwordVal) {
    success = false;
    setError(cpassword, "Password does not match");
  } else {
    setSuccess(cpassword);
  }

  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

const ValidateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};



