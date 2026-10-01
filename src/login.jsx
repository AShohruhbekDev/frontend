import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    fetch('https://uzmart-tz4u.onrender.com/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(async (res) => {
        const data = await res.json();
        return { status: res.status, data };
      })
      .then(({ status, data }) => {
        setLoading(false);

        if (status === 200 || status === 201) {
          setSuccess("Muvaffaqiyatli kirdingiz!");
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setError(data.error || data.detail || "Foydalanuvchi nomi yoki parol xato!");
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
        <h1 className="text-[28px] font-bold mb-[24px] text-gray-900">Kirish</h1>
        
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

        <form onSubmit={handleLogin} className="flex flex-col gap-[16px]">
          <input 
            type="text" 
            placeholder="Foydalanuvchi nomi" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 text-white py-[12px] rounded-[12px] font-medium text-[14px] hover:bg-purple-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>

        <p className="text-[14px] text-gray-600 mt-[24px] text-center">
          Hisobingiz yo'qmi? <Link to="/register" className="text-purple-600 font-medium hover:underline">Ro'yxatdan o'tish</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;