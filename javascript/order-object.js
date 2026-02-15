// This module provide an internal representation of the order and method to change it

export const order = {
  items: [],
  price: 0,

  updatePrice() {
    this.price = this.items.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
  },

  addItem(item) {
    const itemToUpdate = this.items.find(
      (orderItem) => orderItem.name === item.name
    );

    if (itemToUpdate) {
      itemToUpdate.amount += 1;
    } else {
      this.items.push({
        name: item.name,
        price: item.price,
        amount: 1,
      });
    }

    this.updatePrice();
  },

  removeItem(item) {
    const itemIndex = this.items.findIndex(
      (orderItem) => orderItem.name === item.name
    );

    this.items.splice(itemIndex, 1);

    this.updatePrice();
  },

  resetOrder() {
    this.items = [];
    this.price = 0;
  },
};
