import { checkOrderButton, main } from "./shared-dom-refs.js";

main.addEventListener("click", () => {
  checkOrderButton.disabled = false;
  checkOrderButton.classList.add("enabled-button");
});
