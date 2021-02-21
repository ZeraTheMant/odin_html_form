const emailInput = document.querySelector('#email');
const telInput = document.querySelector('#tel');
const passwordInput = document.querySelector('#password');
const formInfoBox = document.querySelector('#form-info-box');
const emailErrorMsg = document.querySelector('#email-error-msg');
const passwordErrorMsg = document.querySelector('#password-error-msg');
const form = document.querySelector('form');

function focusEvent(e) {
    const rect = e.target.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    formInfoBox.style.top = (window.scrollY + rect.top) + 'px';
    formInfoBox.style.left = (rect.right + 5) + 'px';
    formInfoBox.textContent = getFormInfoBoxTextContent(e.target.id);
}

function getFormInfoBoxTextContent(id) {
    let text = "";
    
    if (id == "email") {
        text = "You'll use this as your user ID.";
    } else if (id == "tel") {
        text = "We strongly recommend adding a phone number. This will help verify your account and keep it safe.";
    } else {
        text = "Create a password that you've never used before. This will help keep your account safe. Minimum length of 6 characters.";
    }
    
    return text;
}

function validateEmail(mail) {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
}

function emailFocusOutEvent(e) {
    if (!validateEmail(e.target.value)) {
        emailErrorMsg.classList.remove('hidden');        
    } else {
        emailErrorMsg.classList.add('hidden');  
    }
    removeFormBoxDisplay();
}

function telFocusOutEvent(e) {
    removeFormBoxDisplay();
}

function validatePassword(password) {
    return password.length < 6;
}

function passwordFocusOutEvent(e) {
    if (validatePassword(e.target.value)) {
        passwordErrorMsg.classList.remove('hidden');
    } else {
        passwordErrorMsg.classList.add('hidden');
    }
    removeFormBoxDisplay();
}

function removeFormBoxDisplay() {
    formInfoBox.style.top = '-100px';
    formInfoBox.style.left = '-100px';
}

emailInput.addEventListener('focus', focusEvent);
telInput.addEventListener('focus', focusEvent);
passwordInput.addEventListener('focus', focusEvent);

emailInput.addEventListener('focusout', emailFocusOutEvent);
telInput.addEventListener('focusout', telFocusOutEvent);
passwordInput.addEventListener('focusout', passwordFocusOutEvent);

form.addEventListener('submit', (e) => {
   e.preventDefault();
   if (!validateEmail(emailInput.value) || validatePassword(passwordInput.value)) {
       alert("Registration error. Please correct all errors in the registration form.");
   } else {
       alert("Registration successful!");
       e.target.reset();
   }
});