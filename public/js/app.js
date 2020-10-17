console.log("Client side JS script loaded...");

const form = document.querySelector("form");
const input = document.querySelector("input");
const msgLocation = document.querySelector("#msg-location");
const msgForecast = document.querySelector("#msg-forecast");

msgLocation.textContent = "Loading...";
msgForecast.textContent = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = input.value;

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msgLocation.textContent = data.error;
        msgForecast.textContent = "";
      } else {
        msgLocation.textContent = data.location;
        msgForecast.textContent = data.forecast;
      }
    });
  });
});
