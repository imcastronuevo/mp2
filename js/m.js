// document.addEventListener('DOMContentLoaded', function () {
// 	var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
// 		interval: 2900
// 	});
// });
// Get the button
var mybutton = document.getElementById("scrollUpBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// form valitation
  const validateForm = () => {
  const firstNameInput = document.getElementById("first_name");
  const lastNameInput = document.getElementById("last_name");
  const mobileNumberInput = document.getElementById("mobile_number");
  const phoneNumberInput = document.getElementById("phone_number");
  const preferredDateTimeInput = document.getElementById("preferred_datetime");

  // Validation for first name (text only)
  if (!/^[A-Za-z\s]+$/.test(firstNameInput.value)) {
      alert("Please enter a valid first name with text characters only.");
      return false;
  }

  // Validation for last name (text only)
  if (!/^[A-Za-z\s]+$/.test(lastNameInput.value)) {
      alert("Please enter a valid last name with text characters only.");
      return false;
  }

  // Validation for mobile number (10 digits)
  if (!/^\d{10}$/.test(mobileNumberInput.value)) {
      alert("Please enter a valid mobile number with 10 digits only.");
      return false;
  }

// Validation for phone number (10 digits or "none")
const phoneNumberValue = phoneNumberInput.value.trim().toLowerCase();
if (phoneNumberValue !== "none" && !/^\d{10}$/.test(phoneNumberValue)) {
    alert("Please enter a valid phone number with 10 digits only, or type 'none' if you don't have a phone number.");
    return false;
}

  // Validation for preferred date and time
  const selectedDateTime = new Date(preferredDateTimeInput.value);
  const minHour = 8;
  const maxHour = 18;

  if (selectedDateTime.getHours() < minHour || selectedDateTime.getHours() >= maxHour) {
      alert("Please choose a time between 8:00 AM and 6:00 PM.");
      return false;
  }

  return true;
};