// backend/test/item.service.test.js (мінімальний приклад)

const Item = require('../../domain/Item'); 
// Уявіть, що у вас є ItemService, який має методи CRUD.
// Оскільки ви ще не створили ItemService, ми протестуємо базову доменну логіку.

describe('Item Domain Model Validation', () => {

    // Тест 1: Успішний випадок (Коректні дані → очікуваний результат)
    test('should correctly update the item price', () => {
        const item = new Item(1, 'Test Laptop', 1000.00);
        const newPrice = 1250.50;
        
        item.updatePrice(newPrice);
        
        expect(item.price).toBe(newPrice);
    });

    // Тест 2: Помилковий випадок (Порушення інваріанта → помилка)
    test('should throw error when price update is negative', () => {
        const item = new Item(1, 'Test Laptop', 1000.00);
        
        // Перевіряємо, що виклик updatePrice з від'ємним числом викликає помилку
        expect(() => {
            item.updatePrice(-50.00);
        }).toThrow("BUSINESS_RULE_VIOLATION: Price cannot be negative.");
    });
});