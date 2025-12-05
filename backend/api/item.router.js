// backend/api/item.router.js
const express = require('express');
const router = express.Router();
const ItemService = require('../service/item.service'); 

// Додаємо заглушку для стандартизованої відповіді помилки згідно з OpenAPI
const ErrorResponse = (code, errorType, details) => ({
    error: errorType,
    code: code,
    details: details || []
});


// 1. POST /items (Створення)
router.post('/', (req, res) => {
    try {
        const newItem = ItemService.createItem(req.body);
        // Статус 201 Created згідно з OpenAPI
        res.status(201).json(newItem); 
    } catch (error) {
        // Наприклад, помилка валідації
        res.status(400).json(ErrorResponse('VALIDATION_FAILED', 'ValidationError', [{ message: error.message }]));
    }
});


// 2. GET /items (Список)
router.get('/', (req, res) => {
    const items = ItemService.getAllItems();
    // Статус 200 OK
    res.status(200).json(items); 
});


// 3. GET /items/{id} (Деталі)
router.get('/:id', (req, res) => {
    const item = ItemService.getItemById(req.params.id);
    if (!item) {
        // Статус 404 Not Found
        return res.status(404).json(ErrorResponse('ITEM_NOT_FOUND', 'NotFoundError'));
    }
    res.status(200).json(item);
});


// 4. PATCH /items/{id} (Оновлення)
router.patch('/:id', (req, res) => {
    const updatedItem = ItemService.updateItem(req.params.id, req.body);
    if (!updatedItem) {
        return res.status(404).json(ErrorResponse('ITEM_NOT_FOUND', 'NotFoundError'));
    }
    // Статус 200 OK
    res.status(200).json(updatedItem); 
});


// 5. DELETE /items/{id} (Видалення)
router.delete('/:id', (req, res) => {
    const success = ItemService.deleteItem(req.params.id);
    if (!success) {
        return res.status(404).json(ErrorResponse('ITEM_NOT_FOUND', 'NotFoundError'));
    }
    // Статус 204 No Content
    res.status(204).send(); 
});


module.exports = router;