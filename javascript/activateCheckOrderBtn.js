const checkOrderBtn = document.querySelector("#check-order-button");

document.querySelector("main").addEventListener("click", () => {
  checkOrderBtn.disabled = false;
  checkOrderBtn.classList.add("enabled-button");
});
