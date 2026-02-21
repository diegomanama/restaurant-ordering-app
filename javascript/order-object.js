// This module provide an internal representation of the order and method to change it

export const order = {
  items: [],
  price: 0,
  discount: 0,
  discountCriteria: {
    // The order of the criteria in the object matters, as they will be applied in that order.
    // A single item can only be discounted once.
    arepaCombo: ["fixed", 2, ["Arepa", "Side or Extra", "Drink"]],
    cachapaDuoCombo: ["fixed", 5, ["Cachapa", "Drink"], [2, 2]],
    pabellonMeal: ["percentage", 0.1, ["Pabellón Criollo", "Drink", "Dessert"]],
    familyPack: ["percentage", 0.15, ["Main", "Drink", "Side"], [4, 4, 2]],
  },

  updatePrice() {
    const subtotal = this.items.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);

    // Reset discount before recalculating it
    this.discount = 0;
    this.items.forEach((item) => (item.numberOfItemsDiscounted = 0));

    // Apply all eligible discounts
    Object.values(this.discountCriteria).forEach((criteria) => {
      this.applyEligibleDiscount(...criteria);
    });

    this.price = subtotal - this.discount;
  },

  applyEligibleDiscount(
    mode = "fixed",
    discountAmount,
    requiredItems,
    requiredAmounts = requiredItems.map(() => 1)
  ) {
    // discountAmount must be a integer representing the fixed discount amount (e.g., 5 for $5 off) or a decimal representing the percentage discount (e.g., 0.1 for 10% off).

    // Parameter Validation

    if (requiredItems.length !== requiredAmounts.length) {
      throw new Error(
        "requiredItems and requiredAmounts must have the same length"
      );
    }
    if (mode === "percentage" && (discountAmount < 0 || discountAmount > 1)) {
      throw new Error(
        "For percentage discounts, discountAmount must be between 0 and 1"
      );
    }
    if (mode === "fixed" && discountAmount <= 0) {
      throw new Error(
        "For fixed discounts, discountAmount must be greater than 0"
      );
    }

    const matchingItemTotals = requiredItems.map((criteria) => {
      const totalItems = this.items.reduce((total, item) => {
        if (item.type === criteria || item.name === criteria) {
          return total + item.amount - item.numberOfItemsDiscounted;
        }
        return total;
      }, 0);

      return totalItems;
    });

    const numberOfMatches = Math.min(
      ...matchingItemTotals.map((amount, index) =>
        Math.floor(amount / requiredAmounts[index])
      )
    );

    if (numberOfMatches === 0) return;

    for (let i = 0; i < numberOfMatches; i++) {
      requiredItems.forEach((criteria, index) => {
        for (let j = 0; j < requiredAmounts[index]; j++) {
          const item = this.items.find((item) => {
            return (
              (item.type === criteria || item.name === criteria) &&
              item.numberOfItemsDiscounted < item.amount
            );
          });

          item.numberOfItemsDiscounted += 1;

          if (mode === "fixed") {
            this.discount +=
              discountAmount / (requiredItems.length * requiredAmounts[index]);
          } else if (mode === "percentage") {
            this.discount += item.price * discountAmount;
          }
        }
      });
    }
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
        type: item.type,
        amount: 1,
        numberOfItemsDiscounted: 0,
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
