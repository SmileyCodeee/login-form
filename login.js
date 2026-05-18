// CUSTOM USER DATASET
const users = [
   { username: "sweta", email: "sweta@gmail.com", password: "swetadevi" },
   { username: "smiley", email: "smiley@gmail.com", password: "smiley" },
   { username: "valorant", email: "valorant@gmail.com", password: "valorant" },
];

// --------------------------------
// GRAB FORM ELEMENTS FROM HTML
// --------------------------------
const form = document.querySelector('form');
const userInput = document.getElementById('userinput');
const email = document.getElementById('email');
const password = document.getElementById('pwd');
const errorContainer = document.getElementById('error-container'); // grab error container
// -----------------------------------------------

// --------------------------------
// HELPER: SHOW ERROR MESSAGE
// shows error between submit and clear button
// --------------------------------
function showError(input, message){

   // show error in container between buttons
   errorContainer.textContent = message;
   errorContainer.style.display = "block";
}

// --------------------------------
// HELPER: REMOVE ERROR MESSAGE
// cleans up error text and border
// ---------------------------------
function removeError(input){
   //look for existing error span inside input's parent
   errorContainer.textContent = "";         // clear the error container
   errorContainer.style.display = "none";   // hide the error container
}

// ---------------------------------------
// HELPER: SHOW SUCCESS MESSAGE
// turns input border green on success
// ---------------------------------------
function showSuccess(input){
   removeError(input);
}

// -------------------------------------
// VALIDATE: Check if fields are empty
// -------------------------------------
function validateEmpty(){
   let valid = true;
   if(userInput.value.trim() === ""){    //trim() - removes spaces from start and end
         //userInput.value - gets whatever user typed in the field, if its empty, show error
      showError(userInput, "⚠ Username or Email is required");
      valid = false;
   } 
   if(password.value.trim() === ""){
      showError(password, "⚠ Password is required");
      valid = false;
   }
   return valid;
}

// ------------------------------
// VALIDATE: Check credentials
// against the custom dataset
// ------------------------------
function validCredential(){
   const inputValue = userInput.value.trim().toLowerCase();   // toLowerCase() not tolowercase()
   const inputPassword = password.value.trim();

   const findUser = users.find(
      (user) =>   //callback function, loops through each item in the array 'users'
      // "user" represents each item in the array one by one
         // loop 1: user = { username: "sweta", email: "sweta@gmail.com", ... }
         // loop 2: user = { username: "smiley", email: "smiley@gmail.com", ... }
         // loop 3: user = { username: "valorant", email: "valorant@gmail.com", ... }
         user.username.toLowerCase() === inputValue ||
         user.email.toLowerCase() === inputValue
      );
      // if user types "unknown" returns undefined 
      
      if(!findUser){
         showError(userInput, "⚠ Username or Email not found");   // pass input element as first argument
         return false;
      }
      if(findUser.password !== inputPassword){
         showError(password, "⚠ Incorrect password");   // separated into two checks
         return false;
      }
      showSuccess(userInput);   // pass input elements not user object
      showSuccess(password);
      return true;   // tells form submit to continue
}

// -------------------------------
// REAL TIME VALIDATION
// removes error as user types
// -------------------------------
userInput.addEventListener("input", () => removeError(userInput));
password.addEventListener("input", () => removeError(password));
   // WITH this:
   // user submits empty form → error appears
   // user starts typing → error DISAPPEARS immediately
   // clean and smooth experience ✅


form.addEventListener("submit", function(e) {
   e.preventDefault();     // WITH preventDefault():
         // → page stays the same ✅
         // → we control what happens next ✅
         // → our validation runs properly ✅
   if(!validateEmpty()) return;     
         // validateEmpty() runs first
         // returns true  → fields are filled ✅
         // returns false → fields are empty ❌

   if(!validCredential()) return;         // only runs if validateEmpty() PASSED
         // returns true  → credentials correct ✅

   alert("✅ Login Successful! Welcome " + userInput.value);
});

// --------------------------------
// CLEAR BUTTON
// resets form and removes all errors
// --------------------------------
const clearBtn = document.querySelector('.cls');
clearBtn.addEventListener('click', function() {
   userInput.value = '';      // use .value to clear input field, visually empties the text box
   password.value = '';       // use .value to clear input field
   removeError(userInput);
   removeError(password);
});