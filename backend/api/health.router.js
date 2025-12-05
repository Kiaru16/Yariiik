// backend/api/health.router.js
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    // В ідеалі, тут має бути перевірка з'єднання з БД
    res.status(200).send('ok');
});

module.exports = router;