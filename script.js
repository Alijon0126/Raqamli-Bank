// "Xizmatlarimizni ko‘rish" tugmasi bosilganda xizmatlar bo‘limiga o'tish
document.querySelector("button").addEventListener("click", function() {
    window.location.href = "#services";
});

// Faqat bitta bo‘limni ko‘rsatish (qolgani yashiriladi)
function showOnly(sectionId) {
    const sections = ['about', 'services', 'register'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (id === sectionId) {
            el.classList.remove('hidden');
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            el.classList.add('hidden');
        }
    });
}

// Navigatsiya tugmalarini bog‘lash
document.getElementById('about-link').addEventListener('click', e => {
    e.preventDefault();
    showOnly('about');
});

document.getElementById('services-link').addEventListener('click', e => {
    e.preventDefault();
    showOnly('services');
});

document.getElementById('register-link').addEventListener('click', e => {
    e.preventDefault();
    showOnly('register');
});

// Emailni tekshirish funksiyasi
function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

// Ro'yxatdan o'tish formasini yuborish
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Email va parolni tekshirish
    if (!validateEmail(email)) {
        alert("Email notogri kiritilgan!");
        return;
    }

    if (password.length < 6) {
        alert("Parol kamida 6 ta belgidan iborat bolishi kerak.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);  // "Ro'yxatdan o'tish muvaffaqiyatli"
            window.location.href = "profil.html"; // Profil sahifasiga o'tish
        } else {
            alert("Xatolik: " + (result.detail || "Ro'yxatdan o'tib bo'lmadi"));
        }
    } catch (error) {
        console.error("Sorovda xatolik:", error);
        alert("Serverga ulanib bolmadi.");
    }
});

// To'lovni amalga oshirish tugmasini bosish
document.getElementById('make-payment').addEventListener('click', function() {
    // Modalni ko'rsatish
    document.getElementById('payment-modal').style.display = 'block';
});

// Modalni yopish
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('payment-modal').style.display = 'none';
});

// To'lovni tasdiqlash
document.getElementById('confirm-payment').addEventListener('click', function() {
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value); // Miqdorni son sifatida olish

    if (recipient && amount > 0) {
        // Backendga to'lovni yuborish
        fetch('/api/make-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient: recipient, amount: amount }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('To\'lov muvaffaqiyatli amalga oshirildi!');
                // Modalni yopish
                document.getElementById('payment-modal').style.display = 'none';
            } else {
                alert('To\'lovda xato yuz berdi!');
            }
        })
        .catch(error => {
            alert('Xatolik yuz berdi!');
            console.error('Error:', error);
        });
    } else {
        alert('Iltimos, barcha ma\'lumotlarni to\'g\'ri kiriting!');
    }
});

// To'lovni amalga oshirish tugmasini bosganda to'lov turlari ko'rsatish
document.getElementById('make-payment-btn').addEventListener('click', function() {
    // To'lov turlari bo'limini ko'rsatish
    document.getElementById('payment-types').classList.remove('hidden');
});

// To'lov turini tanlash
document.getElementById('education-payment').addEventListener('click', function() {
    openPaymentModal("O'qish uchun kontrakt to'lovi");
});

document.getElementById('utilities-payment').addEventListener('click', function() {
    openPaymentModal("Komunal to'lovlar");
});

document.getElementById('radar-payment').addEventListener('click', function() {
    openPaymentModal("Radar uchun to'lov");
});

// Modalni ochish va to'lov turini ko'rsatish
function openPaymentModal(paymentType) {
    document.getElementById('payment-modal').classList.remove('hidden');
    // Modalda to'lov turini ko'rsatish
    document.getElementById('recipient').placeholder = paymentType + " uchun manzilni kiriting";
}

// Modalni yopish
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('payment-modal').classList.add('hidden');
});
