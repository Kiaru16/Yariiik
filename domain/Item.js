// domain/Item.js

class Item {
    constructor(id, name, price) {
        this.id = id;          // ID товару (ключова сутність)
        this.name = name;      // Назва товару
        this.price = price;    // Ціна (Price)
        this.isInStock = true; // Стан наявності (мінімальний стан)
    }

    // Метод: Оновлення ціни
    updatePrice(newPrice) {
        if (newPrice < 0) throw new Error("Price cannot be negative.");
        this.price = newPrice;
        return this;
    }
}

module.exports = Item;