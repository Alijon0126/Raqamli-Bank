from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

# Frontenddan kelgan so‘rovlar uchun ruxsat
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Xavfsizlik uchun frontend manzilini kiriting: ["http://localhost:3000"] kabi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ro'yxatdan o'tish API
@app.post("/register")
async def register(email: str = Form(...), password: str = Form(...)):
    # Email va parolni tekshirish
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Parol kamida 6 ta belgidan iborat bo‘lishi kerak.")
    
    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Email formati noto‘g‘ri.")
    
    print(f"Foydalanuvchi ro'yxatdan o'tdi: {email}, parol: {password}")
    return {"message": "Ro'yxatdan o'tish muvaffaqiyatli"}

# To'lov API
class PaymentRequest(BaseModel):
    recipient: str
    amount: float

@app.post("/api/make-payment")
async def make_payment(payment: PaymentRequest):
    # To'lovni qayta ishlash logikasi (bu yerda sizning tranzaksiya kodlaringiz bo'ladi)
    
    # Miqdorni tekshirish
    if payment.amount <= 0:
        raise HTTPException(status_code=400, detail="Miqdor noto'g'ri.")

    # Success response
    return {"success": True, "message": "To'lov muvaffaqiyatli!"}

# Balansni tekshirish API
@app.get("/api/balance")
async def get_balance(user_id: str):
    # Bu yerda foydalanuvchining balansini olish kodini yozish kerak
    # Masalan, blokcheyndagi wallet balansini tekshirish
    balance = 1000.50  # Foydalanuvchi balansini misol tariqasida kiritdik
    return {"user_id": user_id, "balance": balance}

# Tranzaksiya tarixini olish API
@app.get("/api/transaction-history")
async def get_transaction_history(user_id: str, limit: Optional[int] = 10):
    # Bu yerda foydalanuvchining tranzaksiya tarixini olish
    # Masalan, blokcheyn tranzaksiya tarixini ko‘rsatish
    transactions = [
        {"date": "2025-05-01", "recipient": "user1", "amount": 50.00},
        {"date": "2025-05-02", "recipient": "user2", "amount": 30.00},
    ]
    
    # Yangi tarixni cheklash (limit bilan)
    return {"user_id": user_id, "transactions": transactions[:limit]}

# Pul o'tkazmasi API (masalan, boshqa foydalanuvchiga pul yuborish)
@app.post("/api/transfer")
async def transfer_funds(user_id: str, recipient: str, amount: float):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Miqdor noto‘g‘ri.")
    
    # To'lovni amalga oshirish
    print(f"Foydalanuvchi {user_id}dan {recipient}ga {amount} pul yuborildi.")
    
    # Success response
    return {"success": True, "message": f"{amount} pul {recipient}ga muvaffaqiyatli yuborildi!"}
