const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const street = document.getElementById("street");
const suburb = document.getElementById("suburb");
const postCode = document.getElementById("post-code");
const table = document.getElementById("table-body");

let formData = [];

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check phone length
function checkPhoneLength(input, num) {
  if (input.value.length !== num) {
    showError(input, `${getFieldName(input)} must only be ${num} numbers`);
  } else {
    showSuccess(input);
  }
}

// Check post code is valid
function checkPostCode(input) {
  const re = /^[0-9]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Post Code must contain numbers");
  }
}

// Check phone number is valid
function checkPhone(input) {
  const re = /^[0-9]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Phone number must contain numbers");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email]);
  checkLength(username, 3, 15);
  checkPhoneLength(phone, 6);
  checkPhone(phone);
  checkPostCode(postCode);
  checkEmail(email);

  const inputUserName = userName.value;
  const inputEmail = email.value;
  const inputPhone = phone.value;
  const inputStreet = street.value;
  const inputSuburb = suburb.value;
  const inputPostCode = postCode.value;

  formData.push({username: inputUserName, email: inputEmail, phone: inputPhone, street: inputStreet, suburb: inputSuburb, postcode: inputPostCode});

  console.log(formData);
  writeData(formData);
});

function writeData(input) {
  table.innerHTML = ` 
      <tr>
        <td>${input[0].username}</td>
        <td>${input[0].email}</td>
        <td>${input[0].street}</td>
        <td>${input[0].suburb}</td>
        <td>${input[0].postcode}</td>
        <td>${input[0].phone}</td>
      </tr>
  `;
}
