const checkOrderButton = document.querySelector("#check-order-button");

document.querySelector("main").addEventListener("click", () => {
  checkOrderButton.disabled = false;
  checkOrderButton.classList.add("enabled-button");
});
