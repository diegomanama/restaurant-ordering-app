// DOM element references
const checkOrderBtn = document.querySelector("#check-order-button");
const closeOrderModalBtn = document.querySelector("#close-order-modal-btn");
const completeOrderBtn = document.querySelector("#complete-order-btn");
const orderModal = document.querySelector("#order-modal");
const paymentModal = document.querySelector("#payment-modal");
const closePaymentBtn = document.querySelector("#close-payment-btn");
const payButton = document.querySelector("#pay-button");
const finalModal = document.querySelector("#final-modal");
const closeFinalModalBtn = document.querySelector("#close-final-modal-btn");
const finalMessage = document.querySelector("#final-message");
const nonModalContent = document.querySelector(":not(:modal)");

// Functions

const equateElementHeights = (baseEl, targetEL) => {
  targetEL.style.blockSize = window
    .getComputedStyle(baseEl)
    .getPropertyValue("block-size");
};

// Event listeners
checkOrderBtn.addEventListener("click", () => {
  orderModal.showModal();
  nonModalContent.classList.toggle("blur");
});

closeOrderModalBtn.addEventListener("click", () => {
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
  const customerName = new FormData(
    document.querySelector("#card-details-form")
  ).get("customer-name");

  finalMessage.textContent = customerName
    ? `Thanks, ${customerName}! Your order is on its way`
    : `Thanks! Your order is on its way`;
  equateElementHeights(paymentModal, finalModal);
  paymentModal.close();
  finalModal.showModal();
});

closeFinalModalBtn.addEventListener("click", () => {
  finalModal.close();
  nonModalContent.classList.toggle("blur");
});
