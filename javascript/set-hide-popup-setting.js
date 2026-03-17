import { popupModal, hidePopupCheckbox } from "./shared-dom-refs.js";

popupModal.querySelector("form").addEventListener("submit", () => {
  localStorage.setItem("hidePopup", hidePopupCheckbox.checked);
});
