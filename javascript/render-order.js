import * as order from "./order.js";
import { orderTableBody, totalPriceCell } from "./shared-dom-refs.js";

export const renderOrder = () => {
  // Create rows for new items
  order.items.forEach((item) => {
    if (
      !Array.from(orderTableBody.children)
        .map((element) => element.dataset.itemName)
        .includes(item.name)
    ) {
      const newTableRow = document.createElement("tr");

      newTableRow.dataset.itemName = item.name;

      newTableRow.innerHTML = `
        <td class="product-main-cell">
          <span class="item-name-container">${item.name} × ${item.amount}</span>
          <button class="remove-item-button" data-item-name="${item.name}">Remove</button>
        </td>
        <td class="product-price-cell">$${item.price * item.amount}</td>
      `;

      orderTableBody.appendChild(newTableRow);
    }
  });

  // Update existing rows
  order.items.forEach((item) => {
    const existingRow = Array.from(orderTableBody.children).find(
      (element) => element.dataset.itemName === item.name
    );

    if (existingRow) {
      existingRow.querySelector(".item-name-container").textContent =
        `${item.name} × ${item.amount}`;
      existingRow.querySelector(".product-price-cell").textContent =
        `$${item.price * item.amount}`;
    }
  });

  // Clear rows for items that have been removed
  Array.from(orderTableBody.children).forEach((row) => {
    const itemInOrder = order.items.find(
      (item) => item.name === row.dataset.itemName
    );
    if (!itemInOrder) {
      row.remove();
    }
  });

  // Update total price
  totalPriceCell.textContent = `$${order.price}`;
};
