// This module provide an internal representation of the order and method to change it

let items = [];
let price = 0;
let discount = 0;
let discountCriteria = {
  // The order of the criteria in the object matters, as they will be applied in that order.
  // A single item can only be discounted once.
  arepaCombo: ["fixed", 2, ["Arepa", "Side or Extra", "Drink"]],
  cachapaDuoCombo: ["fixed", 5, ["Cachapa", "Drink"], [2, 2]],
  pabellonMeal: ["percentage", 0.1, ["Pabellón Criollo", "Drink", "Dessert"]],
  familyPack: ["percentage", 0.15, ["Main", "Drink", "Side"], [4, 4, 2]],
};

const updatePrice = () => {
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  // Reset discount before recalculating it
  discount = 0;
  items.forEach((item) => (item.numberOfItemsDiscounted = 0));

  // Apply all eligible discounts
  Object.values(discountCriteria).forEach((criteria) => {
    applyEligibleDiscount(...criteria);
  });

  price = subtotal - discount;
};

const applyEligibleDiscount = (
  mode = "fixed",
  discountAmount,
  requiredItems,
  requiredAmounts = requiredItems.map(() => 1)
) => {
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
    const totalItems = items.reduce((total, item) => {
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
        const item = items.find((item) => {
          return (
            (item.type === criteria || item.name === criteria) &&
            item.numberOfItemsDiscounted < item.amount
          );
        });

        item.numberOfItemsDiscounted += 1;

        if (mode === "fixed") {
          discount +=
            discountAmount / (requiredItems.length * requiredAmounts[index]);
        } else if (mode === "percentage") {
          discount += item.price * discountAmount;
        }
      }
    });
  }
};

const addItem = (item) => {
  const itemToUpdate = items.find((orderItem) => orderItem.name === item.name);

  if (itemToUpdate) {
    itemToUpdate.amount += 1;
  } else {
    items.push({
      name: item.name,
      price: item.price,
      type: item.type,
      amount: 1,
      numberOfItemsDiscounted: 0,
    });
  }

  updatePrice();
};

const removeItem = (item) => {
  const itemIndex = items.findIndex(
    (orderItem) => orderItem.name === item.name
  );

  items.splice(itemIndex, 1);

  updatePrice();
};

const resetOrder = () => {
  items = [];
  price = 0;
};

export { items, price, addItem, removeItem, resetOrder };
