import { requestLanguageData } from "../utils/requestLanguageData.js";
import {
  checkOrderButton,
  popupModal,
  hidePopupCheckboxLabel,
  closePopupModalButton,
  orderModalHeading,
  discountsHeaderCell,
  completeOrderButton,
  cardDetailsForm,
  cardDetailsFormHeading,
  payButton,
  thankYouModal,
  thankYouMessage,
  openRatingModalButton,
  ratingModalQuestion,
} from "./shared-dom-refs.js";

// One-time injection of text content from the language data file

const data = await requestLanguageData();

checkOrderButton.textContent = data.checkOrderButton;
popupModal.querySelector("h2").textContent = data.popupModalHeading;
popupModal.querySelector("p:nth-of-type(1)").textContent = data.popupModalp1;
popupModal.querySelector("p:nth-of-type(2)").innerHTML = data.popupModalp2;
if (document.URL.includes("hidePaymentModal=true")) {
  popupModal.querySelector("p:nth-of-type(2)").innerHTML =
    data.popupModalp2.replace(" {emphasis-note}", "");
}
popupModal.querySelector("p:nth-of-type(3)").innerHTML = data.popupModalp3;
hidePopupCheckboxLabel.textContent = data.hidePopupCheckbox;
closePopupModalButton.textContent = data.closePopupModalButton;
orderModalHeading.textContent = data.orderModalHeading;
discountsHeaderCell.textContent = data.discountsHeaderCell;
completeOrderButton.textContent = data.completeOrderButton;
cardDetailsFormHeading.textContent = data.cardDetailsFormHeading;
cardDetailsForm.elements["customer-name"].placeholder =
  data.customerNameInputPlaceholder;
cardDetailsForm.elements["card-number"].placeholder =
  data.cardNumberInputPlaceholder;
cardDetailsForm.elements["cvv"].placeholder = data.cvvInputPlaceholder;
payButton.textContent = data.payButton;
openRatingModalButton.textContent = data.openRatingModalButton;
ratingModalQuestion.textContent = data.ratingModalQuestion;

// Dynamic injection

thankYouModal.addEventListener("toggle", () => {
  if (!thankYouModal.open) return;
  const customerName = new FormData(cardDetailsForm).get("customer-name");

  if (document.URL.includes("hidePaymentModal=true")) {
    thankYouMessage.textContent = data.thankYouMessage.replace(
      ", {customer-name}",
      ""
    );
  } else {
    thankYouMessage.textContent = data.thankYouMessage.replace(
      "{customer-name}",
      customerName
    );
  }
});
