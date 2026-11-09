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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 md:p-6 font-sans text-gray-800">
      <div className="w-full max-w-[420px] bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2">Xush kelibsiz!</h2>
          <p className="text-xs text-gray-500 font-medium">UzMart hisobingizga kiring</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation text-sm shrink-0"></i>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-sm shrink-0"></i>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 ml-1">Foydalanuvchi nomi</label>
            <input 
              type="text" 
              placeholder="Username kiriting" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-[#8A00FF] focus:ring-4 focus:ring-purple-500/10 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 ml-1">Parol</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-[#8A00FF] focus:ring-4 focus:ring-purple-500/10 transition"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 bg-[#8A00FF] hover:bg-purple-700 active:scale-98 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-md shadow-purple-600/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm"></i> Tekshirilmoqda...
              </>
            ) : (
              "Kirish"
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-8 text-center font-medium">
          Hisobingiz yo'qmi? <Link to="/register" className="text-[#8A00FF] font-bold hover:underline">Ro'yxatdan o'tish</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;