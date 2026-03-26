import {
  checkOrderButton,
  main,
  modals,
  orderTableBody,
} from "./shared-dom-refs.js";
import { addEventListenerAll } from "../utils/addEventListenerAll.js";

main.addEventListener("click", () => {
  checkOrderButton.disabled = false;
  checkOrderButton.classList.add("enabled-button");
});

addEventListenerAll(modals, "toggle", () => {
  if (modals.some((modal) => modal.open)) {
    checkOrderButton.disabled = true;
    checkOrderButton.classList.remove("enabled-button");
  }
  if (
    !modals.some((modal) => modal.open) &&
    orderTableBody.children.length > 0
  ) {
    checkOrderButton.disabled = false;
    checkOrderButton.classList.add("enabled-button");
  }
});
