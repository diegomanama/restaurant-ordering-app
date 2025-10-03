const checkOrdenBtn = document.querySelector("#check-order-button");
const closeOrderBtn = document.querySelector("#close-order-btn");
const backgroundContainer = document.querySelector(".background-container");
const flowLayout = document.querySelectorAll(
  "body > :not(.background-container)"
);

[checkOrdenBtn, closeOrderBtn].forEach((element) => {
  element.addEventListener("click", () => {
    backgroundContainer.classList.toggle("visible");
    flowLayout.forEach((element) => element.classList.toggle("blur"));
  });
});

const completeOrdenBtn = document.querySelector("#complete-orden-btn");

completeOrdenBtn.addEventListener("click", () => {
  console.log("click");
});
