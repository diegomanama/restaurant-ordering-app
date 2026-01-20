import {
  checkOrderButton,
  closeOrderModalButton,
  completeOrderButton,
  orderModal,
  paymentModal,
  closePaymentButton,
  payButton,
  finalModal,
  closeFinalModalButton,
  finalMessage,
  nonModalContent
} from "./shared-dom-refs.js";

// Functions

export const equateElementHeights = (baseEl, targetEL) => {
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
