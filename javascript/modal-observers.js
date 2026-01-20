import { orderTableBody, checkOrderButton, orderModal, nonModalContent } from "./shared-dom-refs.js";

const handleEmptyOrderState = () => {
  if (orderTableBody.children.length === 0) {
    checkOrderButton.disabled = true;
    checkOrderButton.classList.remove("enabled-button");
    orderModal.close();
    nonModalContent.classList.toggle("blur");
  }
};

const orderStateObserver = new MutationObserver(handleEmptyOrderState);

orderStateObserver.observe(orderTableBody, { childList: true });