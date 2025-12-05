// 1. Імпорт модулів
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); 
const cors = require('cors');

const app = express();
const port = 3000; 

// 2. Налаштування CORS (дозволяє клієнту з іншого порту звертатися до API)
app.use(cors()); 

// 3. Підключення до БД. Шлях '../db/shop.db' - важливий!
// '..' означає вийти з папки 'backend'
const db = new sqlite3.Database('../db/shop.db', (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
        process.exit(1); 
    } else {
        console.log('✅ Успішно підключено до бази даних SQLite.');
    }
});

// 4. Створення Endpoint: GET /items (вимога 2b)
app.get('/items', (req, res) => {
    // SQL-запит для отримання даних з таблиці items
    const sql = 'SELECT id, name, price FROM items ORDER BY id';

    db.all(sql, [], (err, rows) => {
        if (err) {
            // У разі помилки повертаємо статус 500
            res.status(500).json({"error": err.message});
            return;
        }
        // Повертаємо дані з БД у форматі JSON
        res.json({
            "message": "success",
            "count": rows.length,
            "data": rows 
        });
    });
});

// 5. Запуск сервера
app.listen(port, () => {
    console.log(`🚀 Сервер запущено! API доступне на http://localhost:${port}`);
    console.log(`Тестовий endpoint: http://localhost:${port}/items`);
});