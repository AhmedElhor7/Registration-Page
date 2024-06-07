// Element selectors
let inputForEmailLogin = document.getElementById("inputForEmailLogin");
let inputForPasswordLogin = document.getElementById("inputForPasswordLogin");
let inputForNameSign = document.getElementById("inputForNameSign");
let inputForEmailSign = document.getElementById("inputForEmailSign");
let inputForPasswordSign = document.getElementById("inputForPasswordSign");
let inputForPasswordSignAgain = document.getElementById(
  "inputForPasswordSignAgain"
);
let loginButton = document.getElementById("loginButton");
let signButton = document.getElementById("signButton");
let signupSystem = document.getElementById("signupSystem");
let loginSystem = document.getElementById("loginSystem");
let btnLogin = document.getElementById("btnLogin");
let btnSign = document.getElementById("btnSign");
let home = document.getElementById("home");
let showPassword = document.getElementById("showPassword");

// Arrays to store user data
let nameArray = [];
let emailArray = [];
let passwordArray = [];

// Clear Value From Input

function clear() {
  inputForNameSign.value = "";
  inputForEmailSign.value = "";
  inputForPasswordSign.value = "";
  inputForPasswordSignAgain.value = "";
  inputForEmailLogin.value = "";
  inputForPasswordLogin.value = "";
}

// Function to validate input fields
function validationInputRegex(element) {
  let regex = {
    inputForNameSign: /^.{1,15}$/, // Allows any character up to 15 characters long
    inputForEmailSign: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/, // Correct email pattern
    inputForPasswordSign:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{6,}$/, // Strong password pattern
  };

  let isValidRegx = regex[element.id].test(element.value);

  if (isValidRegx) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");

    switch (element.id) {
      case "inputForNameSign":
        document.getElementById("messageNameValid").classList.add("d-none");
        break;
      case "inputForEmailSign":
        document.getElementById("messageEmailValid").classList.add("d-none");
        break;
      case "inputForPasswordSign":
        document.getElementById("messagePasswordValid").classList.add("d-none");
        break;
    }
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    switch (element.id) {
      case "inputForNameSign":
        document.getElementById("messageNameValid").classList.remove("d-none");
        break;
      case "inputForEmailSign":
        document.getElementById("messageEmailValid").classList.remove("d-none");
        break;
      case "inputForPasswordSign":
        document
          .getElementById("messagePasswordValid")
          .classList.remove("d-none");
        break;
    }
    return false;
  }
}

// Signup Button Click Event
signButton.addEventListener("click", function () {
  let nameSign = inputForNameSign.value;
  let emailSign = inputForEmailSign.value;
  let passwordSign = inputForPasswordSign.value;
  let passwordSignAgain = inputForPasswordSignAgain.value;

  let isNameValid = validationInputRegex(inputForNameSign);
  let isEmailValid = validationInputRegex(inputForEmailSign);
  let isPasswordValid = validationInputRegex(inputForPasswordSign);
  let isPasswordMatch = passwordSign === passwordSignAgain;

  if (!isPasswordMatch) {
    // If passwords don't match, show validation message for password confirmation
    document.getElementById("messagePasswordAgainValid").classList.remove("d-none");
  } else {
    // If passwords match, hide validation message for password confirmation
    document.getElementById("messagePasswordAgainValid").classList.add("d-none");
  }

  if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    nameArray.push(nameSign);
    emailArray.push(emailSign);
    passwordArray.push(passwordSign);
    localStorage.setItem("names", JSON.stringify(nameArray));
    localStorage.setItem("email", JSON.stringify(emailArray));
    localStorage.setItem("password", JSON.stringify(passwordArray));
    console.log(nameArray);
    console.log(emailArray);
    console.log(passwordArray);
    clear();
    signupSystem.classList.add("d-none");
    loginSystem.classList.remove("d-none");
  } else {
    console.error("Please enter all data and ensure passwords match");
  }
});


// Switch to login system
btnLogin.addEventListener("click", function () {
clear();
  signupSystem.classList.add("d-none");
  loginSystem.classList.remove("d-none");
});

// Switch to SignUp system
btnSign.addEventListener("click", function () {
      window.location.reload();

  clear();
  loginSystem.classList.add("d-none");
  signupSystem.classList.remove("d-none");
});

// Show Password functionality
showPassword.addEventListener("click", function () {
  let passwordInput = document.getElementById("inputForPasswordLogin");
  let currentType = passwordInput.getAttribute("type");

  if (currentType === "password") {
    passwordInput.setAttribute("type", "text");
  } else {
    passwordInput.setAttribute("type", "password");
  }
});

// Login Button Click Event
loginButton.addEventListener("click", function () {
  let emailLogin = inputForEmailLogin.value.toLowerCase();
  let passwordLogin = inputForPasswordLogin.value;
  let isAuthenticated = false;

  // Retrieve data from localStorage
  let nameArray = JSON.parse(localStorage.getItem("names")) || [];
  let emailArray = JSON.parse(localStorage.getItem("email")) || [];
  let passwordArray = JSON.parse(localStorage.getItem("password")) || [];

  // Check if arrays are empty
  if (
    nameArray.length === 0 ||
    emailArray.length === 0 ||
    passwordArray.length === 0
  ) {
    console.log("No registered users found.");
    // Optionally, show an error message to the user here
    return;
  }

  // Loop through arrays to find a match
  for (let i = 0; i < emailArray.length; i++) {
    if (
      emailLogin === emailArray[i].toLowerCase() &&
      passwordLogin === passwordArray[i]
    ) {
      isAuthenticated = true;
      let welcome = document.getElementById("welcome");
      welcome.innerHTML = `Welcome ${nameArray[i]}`;
      console.log(`Welcome ${nameArray[i]}`);
      // Show the home section and hide the login system section
      home.classList.remove("d-none");
      loginSystem.classList.add("d-none");
      clear();
      break; // Exit the loop once a match is found
    }
  }
  if (!isAuthenticated) {
    console.log("Have Problem At Email Or Password");
    document.getElementById("messageValid").classList.remove("d-none");
  } else {
    // If passwords match, hide validation message for password confirmation
    document.getElementById("messageValid").classList.add("d-none");
  }
  }
);
