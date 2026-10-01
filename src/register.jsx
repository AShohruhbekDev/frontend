import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== againPassword) {
      setError("Parollar bir xil emas!");
      return;
    }

    setLoading(true);

    fetch('https://uzmart-tz4u.onrender.com/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: username, 
        email: email, 
        password: password, 
        again_password: againPassword 
      })
    })
      .then(async (res) => {
        const data = await res.json();
        return { status: res.status, data };
      })
      .then(({ status, data }) => {
        setLoading(false);

        if (status === 200 || status === 201) {
          setSuccess("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError(data.error || data.username || data.email || "Xatolik yuz berdi!");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Xatolik:", err);
        setError("Server bilan aloqa yo'q!");
      });
  };

  return (
    <div className="min-h-[100vh] bg-gray-50 flex items-center justify-center p-[16px]">
      <div className="w-full max-w-[450px] p-[32px] bg-white border border-gray-200 rounded-[16px] shadow-sm">
        <h1 className="text-[28px] font-bold mb-[24px] text-gray-900">Ro'yxatdan o'tish</h1>
        
        {error && (
          <div className="mb-[16px] p-[12px] bg-red-50 border border-red-200 text-red-600 text-[14px] rounded-[12px]">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-[16px] p-[12px] bg-green-50 border border-green-200 text-green-600 text-[14px] rounded-[12px]">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-[16px]">
          <input 
            type="text" 
            placeholder="Foydalanuvchi nomi" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-[12px] rounded-[12px] text-[14px] focus:outline-none focus:border-purple-600"
            required
          />
          <input 
            type="email" 
            placeholder="Email manzil" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-[12px] rounded-[12px] text-[14px] focus:outline-none focus:border-purple-600"
            required
          />
          <input 
            type="password" 
            placeholder="Parol" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-[12px] rounded-[12px] text-[14px] focus:outline-none focus:border-purple-600"
            required
          />
          <input 
            type="password" 
            placeholder="Parolni takrorlang" 
            value={againPassword}
            onChange={(e) => setAgainPassword(e.target.value)}
            className="border border-gray-300 p-[12px] rounded-[12px] text-[14px] focus:outline-none focus:border-purple-600"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 text-white py-[12px] rounded-[12px] font-medium text-[14px] hover:bg-purple-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Tekshirilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className="text-[14px] text-gray-600 mt-[24px] text-center">
          Hisobingiz bormi? <Link to="/login" className="text-purple-600 font-medium hover:underline">Kirish</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;