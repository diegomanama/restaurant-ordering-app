// Shared DOM references for the restaurant ordering app
export const menu = document.querySelector("#menu");
export const addItemButtons = document.querySelectorAll(".add-item-button");
export const orderTableBody = document.querySelector("#order-table > tbody");
export const subtotalPriceCell = document.querySelector("#subtotal-price-cell");
export const discountsCell = document.querySelector("#discounts-cell");
export const totalPriceCell = document.querySelector("#total-price-cell");
export const checkOrderButton = document.querySelector("#check-order-button");
export const main = document.querySelector("main");
export const popupModal = document.querySelector("#popup-modal");
export const hidePopupCheckbox = document.querySelector("#hide-popup-checkbox");
export const hidePopupCheckboxLabel = document.querySelector(
  "label[for='hide-popup-checkbox']"
);
export const closePopupModalButton = document.querySelector(
  "#close-popup-modal-button"
);
export const closeOrderModalButton = document.querySelector(
  "#close-order-modal-button"
);
export const completeOrderButton = document.querySelector(
  "#complete-order-button"
);
export const orderModal = document.querySelector("#order-modal");
export const orderModalHeading = orderModal.querySelector("h2");
export const discountsHeaderCell = document.querySelector(
  "#discounts-header-cell"
);
export const paymentModal = document.querySelector("#payment-modal");
export const closePaymentButton = document.querySelector(
  "#close-payment-button"
);
export const cardDetailsForm = document.querySelector("#card-details-form");
export const cardDetailsFormHeading = cardDetailsForm.querySelector("h2");
export const payButton = document.querySelector("#pay-button");
export const thankYouModal = document.querySelector("#thank-you-modal");
export const closeThankYouModalButton = document.querySelector(
  "#close-thank-you-modal-button"
);
export const thankYouMessage = document.querySelector("#thank-you-message");
export const openRatingModalButton = document.querySelector(
  "#open-rating-modal-button"
);
export const ratingModal = document.querySelector("#rating-modal");
export const closeRatingModalButton = document.querySelector(
  "#close-rating-modal-button"
);
export const ratingModalQuestion = ratingModal.querySelector("p");
export const ratingStarsContainer = document.querySelector(
  "#rating-stars-container"
);
export const ratingStars = document.querySelectorAll(".rating-star");
export const nonModalContent = document.querySelector(":not(:modal)");
