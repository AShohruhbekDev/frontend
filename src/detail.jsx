import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://uzmart-tz4u.onrender.com/product/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Serverda xatolik yuz berdi!');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Serverdan kelgan ma'lumot:", data); // F12 -> Console da tekshirish uchun
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Xatolik:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
          <i className="fa-solid fa-spinner animate-spin text-purple-600"></i> Yuklanmoqda...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-xs">
          <p className="text-gray-600 font-medium text-sm">Mahsulot topilmadi!</p>
        </div>
      </div>
    );
  }

  // Asosiy sahifadagi kabi aynan product.rasm ishlatiladi
  const imageUrl = product.rasm 
    ? (product.rasm.startsWith('http') ? product.rasm : `https://uzmart-tz4u.onrender.com${product.rasm}`) 
    : "https://images.uzum.uz/cupefjs5j42bjc4eq1rg/t_product_540_high.jpg";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6 font-sans text-gray-800">
      <div className="max-w-[1100px] mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition shadow-xs cursor-pointer text-gray-700"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i> Orqaga qaytish
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative group w-full h-[400px] sm:h-[480px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner">
              <img 
                src={imageUrl} 
                alt="Product" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out" 
              />
              {product.skidka > 0 && (
                <span className="absolute top-4 left-4 text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-xl shadow-md">
                  -{product.skidka}% chegirma
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3">{product.tavsif}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-black text-gray-900">{product.narx} so'm</span>
                {product.skidka > 0 && (
                  <span className="text-sm font-bold bg-red-50 text-red-600 px-3 py-1 rounded-xl">
                    Aksiya narxi
                  </span>
                )}
              </div>

              {product.rate && (
                <div className="text-xs text-amber-500 font-semibold flex items-center gap-1.5 bg-amber-50 w-fit px-3 py-1.5 rounded-xl border border-amber-200/50 mb-4">
                  <i className="fa-solid fa-star text-sm"></i> <span>Reyting: {product.rate}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Miqdori:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 hover:bg-gray-200 transition text-gray-600 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-gray-900 bg-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1.5 hover:bg-gray-200 transition text-gray-600 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#8A00FF] hover:bg-purple-700 active:scale-98 text-white py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm font-bold cursor-pointer shadow-md shadow-purple-600/20">
                <i className="fa-solid fa-cart-shopping"></i> Savatga qo'shish
              </button>
              <button className="w-full border-2 border-[#8A00FF] text-[#8A00FF] hover:bg-purple-50 py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm font-bold cursor-pointer">
                <i className="fa-solid fa-bag-shopping"></i> Hozir sotib olish
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-truck-fast text-[#8A00FF] text-base"></i>
                <span>Tezkor yetkazib berish</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-[#8A00FF] text-base"></i>
                <span>Sifat kafolati</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
            <i className="fa-solid fa-circle-info text-[#8A00FF]"></i> Mahsulot haqida batafsil
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
            {product.tavsif}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Detail;