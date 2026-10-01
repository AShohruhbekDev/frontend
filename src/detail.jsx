import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://uzmart-tz4u.onrender.com/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Xatolik:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-[20px] text-center">Yuklanmoqda...</div>;
  if (!product) return <div className="p-[20px] text-center">Mahsulot topilmadi!</div>;

  const imageField = product.image || product.rasm || product.photo || product.img || "";

  const imageUrl = imageField 
    ? (imageField.startsWith('http') ? imageField : `http://127.0.0.1:8000${imageField}`) 
    : '';

  return (
    <div className="max-w-[1000px] mx-auto p-[30px] bg-white min-h-[100vh]">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-[20px] border border-gray-300 px-[16px] py-[8px] rounded-[8px] text-[14px] hover:bg-gray-100 transition flex items-center gap-[8px] cursor-pointer"
      >
        <i className="fa-solid fa-arrow-left"></i> Orqaga
      </button>

      <div className="grid grid-cols-2 gap-[40px]">
        <div>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Product" 
              className="w-full h-[600px] object-cover rounded-[12px] border border-gray-200" 
            />
          ) : (
            <div className="w-full h-[600px] bg-gray-100 rounded-[12px] flex items-center justify-center text-gray-400 text-[14px]">
              Rasm mavjud emas
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[20px]">
          <h1 className="text-[24px] font-bold text-gray-900">{product.tavsif}</h1>
          
          <div className="flex items-center gap-[15px]">
            <span className="text-[22px] font-bold text-gray-900">{product.narx} so'm</span>
            {product.skidka > 0 && (
              <span className="text-[14px] bg-red-100 text-red-600 px-[8px] py-[2px] rounded-[4px]">-{product.skidka}%</span>
            )}
          </div>

          {product.rate && (
            <div className="text-[14px] text-amber-500 font-medium"><i className="fa-solid fa-star"></i> {product.rate}</div>
          )}

          <div className="flex flex-col gap-[10px] mt-[20px]">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-[12px] rounded-[8px] transition flex items-center justify-center gap-[8px] text-[14px] font-medium cursor-pointer">
              <i className="fa-solid fa-cart-shopping"></i> Savatga qo'shish
            </button>
            <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-[12px] rounded-[8px] transition flex items-center justify-center gap-[8px] text-[14px] font-medium cursor-pointer">
              <i className="fa-solid fa-bag-shopping"></i> Sotib olish
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[40px] border-t border-gray-200 pt-[25px]">
        <h2 className="text-[18px] font-bold mb-[10px] flex items-center gap-[8px] text-gray-900">
          <i className="fa-solid fa-circle-info text-gray-500"></i> Tavsif
        </h2>
        <p className="text-gray-600 text-[14px] leading-[22px]">
          {product.tavsif}
        </p>
      </div>
    </div>
  );
}

export default Detail;