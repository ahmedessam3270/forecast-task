const form = document.getElementById("location-form");
const input = document.getElementById("address");
let locationP;
let forecastP;
let errorP;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "/weather?address=" + input.value + "";
  form.reset();
});
