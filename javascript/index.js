const checkOrdenBtn = document.querySelector("#check-order-button");
const closeOrderBtn = document.querySelector("#close-order-btn");
const orderModal = document.querySelector("#order-modal");
const nonModalContent = document.querySelector(":not(:modal)");

checkOrdenBtn.addEventListener("click", () => {
  orderModal.showModal();
  nonModalContent.classList.toggle("blur");
});

closeOrderBtn.addEventListener("click", () => {
  orderModal.close();
  nonModalContent.classList.toggle("blur");
});

const completeOrdenBtn = document.querySelector("#complete-orden-btn");

completeOrdenBtn.addEventListener("click", () => {
  console.log("click");
});
