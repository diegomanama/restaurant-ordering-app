import { menuItemsArray as menuItems } from "./menuItemsArray.js";
import { menu } from "./shared-dom-refs.js";

const menuEntriesHTML = menuItems
  .map((item) => {
    return `
        <div class="menu-entry">
            <article class="menu-item">
                <img class="item-image" src="${item.image}">
                <div class="item-data">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="price">$${item.price}</p>
                </div>
            </article>
            <button type="button" class="add-item-button" data-item-name="${item.name}">
                <ion-icon name="add" class="add-item-button-icon"></ion-icon>
            </button>
        </div> 
    `;
  })
  .join("");

menu.innerHTML = menuEntriesHTML;

export const addItemButtons = document.querySelectorAll(".add-item-button");
