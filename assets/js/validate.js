const regexName = /^[A-Z][a-z]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01[0125][0-9]{8}$/;
const ageRegex = /^(1[89]|[2-9][0-9])$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validate(regex, input) {
  var errorElement = input.next();
  if (regex.test(input.val().trim())) {
    input.addClass("is-valid").removeClass("is-invalid");
    errorElement.addClass("d-none");
    return true;
  } else {
    input.addClass("is-invalid").removeClass("is-valid");
    errorElement.removeClass("d-none");
    return false;
  }
}

let userList = JSON.parse(localStorage.getItem("users")) || [];
const userName = $("#userName");
const userEmail = $("#userEmail");
const userPhone = $("#userPhone");
const userAge = $("#userAge");
const userPassword = $("#userPassword");
const rePassword = $("#rePassword");
const duplicateNameError = $(".duplicateNameError");
const datavalid = $(".datavalid");

$("#signupBtn").on("click", function (e) {
  e.preventDefault();

  const nameValid = validate(regexName, userName);
  const emailValid = validate(emailRegex, userEmail);
  const phoneValid = validate(phoneRegex, userPhone);
  const ageValid = validate(ageRegex, userAge);
  const passwordValid = validate(passwordRegex, userPassword);

  const passwordMatchValid = userPassword.val() === rePassword.val();
  if (!passwordMatchValid) {
    rePassword.next().removeClass("d-none");
    rePassword.addClass("is-invalid").removeClass("is-valid");
  } else {
    rePassword.next().addClass("d-none");
    rePassword.addClass("is-valid").removeClass("is-invalid");
  }

  if (!nameValid || !emailValid || !phoneValid || !ageValid || !passwordValid || !passwordMatchValid) return;

  const existEmail = userList.some(
    (item) => item.userEmail.toLowerCase() === userEmail.val().trim().toLowerCase()
  );

  if (existEmail) {
    duplicateNameError.removeClass("d-none");
    datavalid.addClass("d-none");
    userEmail.addClass("is-invalid").removeClass("is-valid");
    return;
  }

  const user = {
    userName: userName.val().trim(),
    userEmail: userEmail.val().trim(),
    userPhone: userPhone.val().trim(),
    userAge: userAge.val().trim(),
    userPassword: userPassword.val().trim()
  };

  userList.push(user);
  localStorage.setItem("users", JSON.stringify(userList));

  duplicateNameError.addClass("d-none");
  datavalid.removeClass("d-none");
  $("form")[0].reset();
  $(".form-control").removeClass("is-valid is-invalid");
});