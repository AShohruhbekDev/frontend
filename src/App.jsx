import { useState, useEffect } from 'react';
import "./App.css";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://uzmart-tz4u.onrender.com/product/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Serverda xatolik yuz berdi!');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.results && Array.isArray(data.results)) {
          setProducts(data.results);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div className="text-red-500 p-[20px] text-center">Xatolik chiqdi: {error}</div>;
  }

  return (
    <div className="min-h-[100vh] bg-gray-50 flex flex-col justify-between font-sans">
      <div>
        <nav className="bg-[#8A00FF] text-white shadow-md">
          <div className="max-w-[1280px] mx-[auto] px-[16px] flex justify-between items-center py-[12px]">
            <div className="flex items-center gap-[16px]">
              <h2 className="text-white text-[32px] font-bold">UzMart</h2>
              <button className="text-[22px] px-[12px] py-[6px] border border-white/40 rounded-[12px]">
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>

            <div className="relative flex items-center w-[500px]">
              <input
                type="text"
                placeholder="Marketdan qidirish..."
                className="w-full px-[16px] py-[12px] text-black bg-white rounded-[16px] focus:outline-none"
              />
              <i className="fa-solid fa-camera absolute right-[16px] text-gray-400 text-[18px]"></i>
            </div>

            <div className="flex items-center gap-[24px]">
              <div className="flex flex-col items-center text-[14px] cursor-pointer">
                <i className="fa-solid fa-location-dot text-[18px]"></i>
                <span>Joylashuv</span>
              </div>
              <Link to="/login" className="flex flex-col items-center text-[14px]">
                <i className="fa-solid fa-user text-[18px]"></i>
                <span>Kirish</span>
              </Link>
              <div className="flex flex-col items-center text-[14px] cursor-pointer">
                <i className="fa-solid fa-cart-shopping text-[18px]"></i>
                <span>Savat</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-[#A855F7] text-white text-[14px] font-medium shadow-sm">
          <div className="max-w-[1280px] mx-[auto] px-[16px] flex items-center gap-[24px] py-[10px] overflow-x-auto">
            <Link to="/category/1" className="whitespace-nowrap">Kiyimlar</Link>
            <Link to="/category/2" className="whitespace-nowrap">Oyoq kiyimlar</Link>
            <Link to="/category/3" className="whitespace-nowrap">Mebel</Link>
            <Link to="/category/4" className="whitespace-nowrap">Chegirmalar</Link>
            <Link to="/category/5" className="whitespace-nowrap">Elektronika</Link>
            <Link to="/category/6" className="whitespace-nowrap">Maishiy Texnika</Link>
          </div>
        </div>

        <div className="max-w-[1280px] mx-[auto] px-[16px] my-[24px]">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            className="rounded-[16px] overflow-hidden shadow-lg w-full"
          >
            <SwiperSlide>
              <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
                <img src="https://images.uzum.uz/dap2a26ta8f7c95q6sn0/main_page_banner.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <section className="max-w-[1280px] mx-[auto] px-[16px] my-[32px]">
          <h3 className="text-[24px] font-bold mb-[24px] text-gray-900">Ommabop mahsulotlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px]">
            {products.map((product) => {
              const imageUrl = product.rasm 
                ? (product.rasm.startsWith('http') ? product.rasm : `https://uzmart-tz4u.onrender.com${product.rasm}`) 
                : "https://images.uzum.uz/cupefjs5j42bjc4eq1rg/t_product_540_high.jpg";

              return (
                <div key={product.id} className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-[12px] flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <img src={imageUrl} alt="" className="rounded-[12px] object-cover w-full h-[240px] mb-[12px]" />
                    </Link>

                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="text-[18px] font-bold text-gray-900">{product.narx} so'm</h4>
                      </Link>
                      {product.skidka > 0 && (
                        <span className="text-[12px] bg-red-100 text-red-600 px-[6px] py-[2px] rounded-[4px] font-medium">-{product.skidka}</span>
                      )}
                    </div>

                    <p className="text-[12px] text-gray-600 line-clamp-2 mt-[4px]">{product.tavsif}</p>
                  </div>

                  <div className="mt-[16px] pt-[8px] border-t border-gray-100">
                    {product.rate && (
                      <div className="text-[12px] text-amber-500 mb-[8px] font-medium"><i className="fa-solid fa-star"></i> {product.rate}</div>
                    )}
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-[8px] rounded-[12px] text-[14px] font-medium cursor-pointer">
                      Buyurtma berish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-white mt-[64px]">
        <div className="max-w-[1280px] mx-[auto] px-[16px] py-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px]">
            <div>
              <h3 className="text-[24px] font-bold mb-[16px]">UzMart</h3>
              <p className="text-gray-400 text-[14px] leading-[24px]">
                Kundalik ehtiyojlar uchun qulay, tez va ishonchli online market.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] mb-[16px]">Kompaniya</h4>
              <ul className="space-y-[8px] text-[14px] text-gray-400">
                <li><a href="#">Biz haqimizda</a></li>
                <li><a href="#">Kontaktlar</a></li>
                <li><a href="#">Yangiliklar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] mb-[16px]">Mijozlar uchun</h4>
              <ul className="space-y-[8px] text-[14px] text-gray-400">
                <li><a href="#">Yetkazib berish</a></li>
                <li><a href="#">Qaytarish</a></li>
                <li><a href="#">Savol-javob</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] mb-[16px]">Aksiyalar</h4>
              <div className="bg-white/5 rounded-[16px] p-[16px] border border-white/10">
                <p className="text-[14px] text-gray-300">Yangiliklardan xabardor bo'ling</p>
                <div className="mt-[12px] flex items-center gap-[8px]">
                  <input
                    type="email"
                    placeholder="Email kiriting"
                    className="w-full bg-gray-800 text-white rounded-[12px] px-[12px] py-[8px] text-[14px] outline-none border border-gray-700"
                  />
                  <button className="bg-purple-600 px-[12px] py-[8px] rounded-[12px] text-[14px] font-medium">
                    Yuborish
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[40px] pt-[24px] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-[12px] text-[14px] text-gray-400">
            <span>© 2026 UzMart. Barcha huquqlar himoyalangan.</span>
            <div className="flex items-center gap-[16px]">
              <i className="fa-brands fa-instagram cursor-pointer"></i>
              <i className="fa-brands fa-telegram cursor-pointer"></i>
              <i className="fa-brands fa-facebook-f cursor-pointer"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;