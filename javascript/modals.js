// DOM element references
const checkOrderButton = document.querySelector("#check-order-button");
const closeOrderModalButton = document.querySelector(
  "#close-order-modal-button"
);
const completeOrderButton = document.querySelector("#complete-order-button");
const orderModal = document.querySelector("#order-modal");
const paymentModal = document.querySelector("#payment-modal");
const closePaymentButton = document.querySelector("#close-payment-button");
const payButton = document.querySelector("#pay-button");
const finalModal = document.querySelector("#final-modal");
const closeFinalModalButton = document.querySelector(
  "#close-final-modal-button"
);
const finalMessage = document.querySelector("#final-message");
const nonModalContent = document.querySelector(":not(:modal)");

// Functions

const equateElementHeights = (baseEl, targetEL) => {
  targetEL.style.blockSize = window
    .getComputedStyle(baseEl)
    .getPropertyValue("block-size");
};

// Event listeners
checkOrderButton.addEventListener("click", () => {
  orderModal.showModal();
  nonModalContent.classList.toggle("blur");
});

closeOrderModalButton.addEventListener("click", () => {
  orderModal.close();
  nonModalContent.classList.toggle("blur");
});

completeOrderButton.addEventListener("click", () => {
  orderModal.close();
  paymentModal.showModal();
});

closePaymentButton.addEventListener("click", () => {
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

closeFinalModalButton.addEventListener("click", () => {
  finalModal.close();
  nonModalContent.classList.toggle("blur");
});
