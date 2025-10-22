// DOM element references
const checkOrderBtn = document.querySelector("#check-order-button");
const closeOrderBtn = document.querySelector("#close-order-btn");
const completeOrderBtn = document.querySelector("#complete-order-btn");
const orderModal = document.querySelector("#order-modal");
const paymentModal = document.querySelector("#payment-modal");
const closePaymentBtn = document.querySelector("#close-payment-btn");
const payButton = document.querySelector("#pay-button");
const nonModalContent = document.querySelector(":not(:modal)");

// Event listeners
checkOrderBtn.addEventListener("click", () => {
  orderModal.showModal();
  nonModalContent.classList.toggle("blur");
});

closeOrderBtn.addEventListener("click", () => {
  orderModal.close();
  nonModalContent.classList.toggle("blur");
});

completeOrderBtn.addEventListener("click", () => {
  orderModal.close();
  paymentModal.showModal();
});

closePaymentBtn.addEventListener("click", () => {
  paymentModal.close();
  nonModalContent.classList.toggle("blur");
});

payButton.addEventListener("click", () => {
  paymentModal.close();
  nonModalContent.classList.toggle("blur");
});
