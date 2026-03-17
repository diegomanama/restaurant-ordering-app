import {
  checkOrderButton,
  popupModal,
  closeOrderModalButton,
  completeOrderButton,
  orderModal,
  paymentModal,
  closePaymentButton,
  cardDetailsForm,
  thankYouModal,
  closeThankYouModalButton,
  openRatingModalButton,
  ratingModal,
  nonModalContent,
} from "./shared-dom-refs.js";
import { addEventListenerAll } from "../utils/addEventListenerAll.js";

const modals = [
  popupModal,
  orderModal,
  paymentModal,
  thankYouModal,
  ratingModal,
];

// Functions

const equateElementHeights = (baseEl, targetEL) => {
  targetEL.style.blockSize = window
    .getComputedStyle(baseEl)
    .getPropertyValue("block-size");
};

// Event listeners
checkOrderButton.addEventListener("click", () => {
  orderModal.showModal();
  nonModalContent.classList.toggle("no-blur");
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

cardDetailsForm.addEventListener("submit", () => {
  equateElementHeights(paymentModal, thankYouModal);
  // The dialog is natively automatically closed when the form is submitted
  thankYouModal.showModal();
});

closeThankYouModalButton.addEventListener("click", () => {
  thankYouModal.close();
});

openRatingModalButton.addEventListener("click", () => {
  thankYouModal.close();
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

  nonModalContent.classList.toggle("no-blur");
});
