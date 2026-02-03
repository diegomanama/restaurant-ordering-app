import {
  checkOrderButton,
  closeOrderModalButton,
  completeOrderButton,
  orderModal,
  paymentModal,
  closePaymentButton,
  cardDetailsForm,
  payButton,
  finalModal,
  closeFinalModalButton,
  finalMessage,
  openRatingModalButton,
  ratingModal,
  nonModalContent,
} from "./shared-dom-refs.js";
import { addEventListenerAll } from "../utils/addEventListenerAll.js";

const modals = [orderModal, paymentModal, finalModal, ratingModal];

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
});

completeOrderButton.addEventListener("click", () => {
  orderModal.close();
  paymentModal.showModal();
});

closePaymentButton.addEventListener("click", () => {
  paymentModal.close();
});

payButton.addEventListener("click", () => {
  const customerName = new FormData(cardDetailsForm).get("customer-name");

  if (cardDetailsForm.reportValidity()) {
    finalMessage.textContent = customerName
      ? `Thanks, ${customerName}! Your order is on its way`
      : `Thanks! Your order is on its way`;
    equateElementHeights(paymentModal, finalModal);
    // The dialog is natively automatically closed when the form is submitted
    finalModal.showModal();
  }
});

closeFinalModalButton.addEventListener("click", () => {
  finalModal.close();
});

openRatingModalButton.addEventListener("click", () => {
  finalModal.close();
  ratingModal.showModal();
});

ratingModal.addEventListener("click", (event) => {
  const hitArea = ratingModal.getBoundingClientRect();

  const clickedInside =
    event.clientX >= hitArea.left &&
    event.clientX <= hitArea.right &&
    event.clientY >= hitArea.top &&
    event.clientY <= hitArea.bottom;

  if (!clickedInside) {
    ratingModal.close();
  }
});

addEventListenerAll(modals, "close", () => {
  if (modals.some((modal) => modal.open)) {
    return;
  }

  nonModalContent.classList.toggle("blur");
});
