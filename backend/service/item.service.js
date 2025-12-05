const Item = require('../../domain/Item'); 
// Заглушка, що імітує базу даних
const mockItems = [
    new Item(1, 'Ноутбук Pro', 1200.00),
    new Item(2, 'Смартфон S21', 850.50),
    new Item(3, 'Бездротові Навушники', 150.99)
];

class ItemService {
    // 1. POST /items (Створення)
    createItem(itemData) {
        // TODO: Реалізувати перевірку даних та створення Item
        const newItem = { id: mockItems.length + 1, ...itemData, createdAt: new Date(), updatedAt: new Date() };
        mockItems.push(newItem);
        return newItem;
    }

    // 2. GET /items (Список)
    getAllItems() {
        // Наразі повертаємо заглушку
        return mockItems;
    }

    // 3. GET /items/{id} (Деталі)
    getItemById(id) {
        // TODO: Реалізувати пошук
        const item = mockItems.find(i => i.id === parseInt(id));
        return item; // Поверне undefined, якщо не знайдено
    }

    // 4. PATCH /items/{id} (Оновлення)
    updateItem(id, itemUpdateData) {
        // TODO: Реалізувати оновлення та повернути оновлений об'єкт
        const item = this.getItemById(id);
        if (item) {
            Object.assign(item, itemUpdateData, { updatedAt: new Date() });
            return item;
        }
        return null;
    }

    // 5. DELETE /items/{id} (Видалення)
    deleteItem(id) {
        // TODO: Реалізувати видалення
        const initialLength = mockItems.length;
        const index = mockItems.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            mockItems.splice(index, 1);
            return true; 
        }
        return false;
    }
}

module.exports = new ItemService();