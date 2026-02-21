// This module set event listeners to handle user interactions that affect the order content

// Objects
import { menuItemsArray as menuItems } from "./menuItemsArray.js";
import { order } from "./order-object.js";

// Utils
import { addEventListenerAll } from "../utils/addEventListenerAll.js";
import { renderOrder } from "./render-order.js";

// DOM References
import { addItemButtons } from "./render-menu-entries.js";
import { orderTableBody } from "./shared-dom-refs.js";
import { cardDetailsForm } from "./shared-dom-refs.js";

// Event Listeners & Observers

addEventListenerAll(addItemButtons, "click", (event) => {
  const addItemButton = event.currentTarget;

  const matchingItem = menuItems.find(
    (item) => item.name === addItemButton.dataset.itemName
  );

  order.addItem(matchingItem);
  renderOrder();
});

const removeButtonsObserver = new MutationObserver(() => {
  if (orderTableBody.children.length > 0) {
    const removeItemButtons = orderTableBody.querySelectorAll(
      ".remove-item-button"
    );

    const removeItemButtonsWithoutListener = Array.from(
      removeItemButtons
    ).filter((button) => !button.classList.contains("listener-added"));

    addEventListenerAll(removeItemButtonsWithoutListener, "click", (event) => {
      const removeButton = event.currentTarget;

      const matchingItem = order.items.find(
        (item) => item.name === removeButton.dataset.itemName
      );

      order.removeItem(matchingItem);
      renderOrder();
    });

    removeItemButtonsWithoutListener.forEach((button) => {
      button.classList.add("listener-added");
    });
  }
});
removeButtonsObserver.observe(orderTableBody, { childList: true });

cardDetailsForm.addEventListener("submit", () => {
  order.resetOrder();
  renderOrder();
});
