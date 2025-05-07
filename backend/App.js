import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Ro'yxatdan o'tish
  const handleRegister = async () => {
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      body: new URLSearchParams({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await response.json();
    console.log(data);
  };

  // To'lovni yuborish
  const handlePayment = async () => {
    const response = await fetch('http://localhost:8000/api/make-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient,
        amount
      })
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Ro'yxatdan o'tish</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
      />
      <button onClick={handleRegister}>Ro'yxatdan o'tish</button>

      <h1>To'lov yuborish</h1>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Qabul qiluvchi"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Miqdor"
      />
      <button onClick={handlePayment}>To'lov yuborish</button>
    </div>
  );
}

export default App;
