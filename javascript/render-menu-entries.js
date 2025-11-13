import { menuArray as menuItems } from "./data.js";

const menu = document.querySelector("#menu");
const menuEntriesHTML = menuItems
  .map((item) => {
    return `
        <div class="menu-entry">
            <article class="menu-item">
                <div class="item-image">${item.emoji}</div>
                <div class="item-data">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
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
