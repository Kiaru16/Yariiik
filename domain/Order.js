// domain/Order.js

class Order {
    constructor(userId) {
        this.id = Math.random().toString(36).substring(2, 9); // Генерація тимчасового ID
        this.userId = userId; // Посилання на користувача (User)
        this.items = [];     // Список позицій замовлення (OrderItem)
        this.status = 'PENDING';
        this.createdAt = new Date();
    }

    // Метод: Додати позицію до замовлення
    addItem(item, quantity) {
        if (quantity <= 0) throw new Error("Quantity must be positive.");
        
        // Тут OrderItem фіксує ціну на момент замовлення
        const orderItem = {
            itemId: item.id,
            name: item.name,
            priceAtOrder: item.price,
            quantity: quantity
        };
        this.items.push(orderItem);
    }

    // Метод: Розрахувати загальну суму
    getTotal() {
        return this.items.reduce((total, item) => total + (item.priceAtOrder * item.quantity), 0);
    }
}

module.exports = Order;