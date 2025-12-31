import { menuArray } from "./data.js";
import { addItemButtons } from "./render-menu-entries.js";
import { addEventListenerAll } from "../utils/addEventListenerAll.js";

const orderTableBody = document.querySelector("#order-table > tbody");
const totalPriceCell = document.querySelector("#total-price-cell");

const addItemToOrder = (event) => {
  const addItemButton = event.currentTarget;

  const matchingItem = menuArray.filter((item) => {
    return item.name === addItemButton.dataset.itemName;
  })[0];

  if (
    Array.from(orderTableBody.children)
      .map((element) => element.dataset.itemName)
      .includes(matchingItem.name)
  ) {
    // Update rows for items added at least once

    const targetRow = Array.from(orderTableBody.children).filter((element) => {
      return element.dataset.itemName === matchingItem.name;
    })[0];

    targetRow.dataset.amount = Number(targetRow.dataset.amount) + 1;

    targetRow.querySelector(".item-name-container").textContent =
      `${matchingItem.name} × ${targetRow.dataset.amount}`;

    targetRow.querySelector(".product-price-cell").textContent =
      `$${matchingItem.price * Number(targetRow.dataset.amount)}`;
  } else {
    // Add new rows for items not added yet

    const newTableRow = document.createElement("tr");

    newTableRow.dataset.itemName = matchingItem.name;
    newTableRow.dataset.amount = 1;

    newTableRow.innerHTML = `
      <td class="product-main-cell">
        <span class="item-name-container">${matchingItem.name}</span>
        <button class="remove-item-button" >Remove</button>
      </td>
      <td class="product-price-cell">$${matchingItem.price}</td>
    `;

    newTableRow
      .querySelector(".remove-item-button")
      .addEventListener("click", () => removeEntryFromOrder(newTableRow), {
        once: true,
      });

    orderTableBody.append(newTableRow);
  }

  // Update total price

  updateTotalPrice();
};

const removeEntryFromOrder = (targetRow) => {
  targetRow.remove();
  updateTotalPrice();
};

const updateTotalPrice = () => {
  let totalPrice = 0;

  document.querySelectorAll(".product-price-cell").forEach((cell) => {
    totalPrice += Number(cell.textContent.slice("1"));
  });

  totalPriceCell.textContent = `$${totalPrice}`;
};

addEventListenerAll(addItemButtons, "click", addItemToOrder);
