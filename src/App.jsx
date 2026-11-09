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
    return <div className="text-red-500 p-5 text-center font-medium">Xatolik chiqdi: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans text-gray-800">
      <div>
        <nav className="bg-[#8A00FF] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center py-3">
            <div className="flex items-center gap-4">
              <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">UzMart</h2>
              <button className="text-lg px-3 py-1.5 border border-white/30 hover:bg-white/10 rounded-xl transition duration-150">
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>

            <div className="relative flex items-center w-full max-w-[450px] mx-4">
              <input
                type="text"
                placeholder="Marketdan qidirish..."
                className="w-full px-4 py-2.5 text-gray-900 bg-white rounded-xl focus:outline-none shadow-sm text-sm"
              />
              <i className="fa-solid fa-camera absolute right-4 text-gray-400"></i>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center text-xs cursor-pointer hover:opacity-80 transition duration-150">
                <i className="fa-solid fa-location-dot text-base mb-0.5"></i>
                <span className="hidden sm:inline">Joylashuv</span>
              </div>
              <Link to="/login" className="flex flex-col items-center text-xs hover:opacity-80 transition duration-150">
                <i className="fa-solid fa-user text-base mb-0.5"></i>
                <span className="hidden sm:inline">Kirish</span>
              </Link>
              <div className="flex flex-col items-center text-xs cursor-pointer hover:opacity-80 transition duration-150">
                <i className="fa-solid fa-cart-shopping text-base mb-0.5"></i>
                <span className="hidden sm:inline">Savat</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white border-b border-gray-100 shadow-xs">
          <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-6 py-2.5 overflow-x-auto text-sm font-medium text-gray-600">
            <Link to="/category/1" className="whitespace-nowrap hover:text-[#8A00FF] transition">Kiyimlar</Link>
            <Link to="/category/2" className="whitespace-nowrap hover:text-[#8A00FF] transition">Oyoq kiyimlar</Link>
            <Link to="/category/3" className="whitespace-nowrap hover:text-[#8A00FF] transition">Mebel</Link>
            <Link to="/category/4" className="whitespace-nowrap hover:text-[#8A00FF] transition">Chegirmalar</Link>
            <Link to="/category/5" className="whitespace-nowrap hover:text-[#8A00FF] transition">Elektronika</Link>
            <Link to="/category/6" className="whitespace-nowrap hover:text-[#8A00FF] transition">Maishiy Texnika</Link>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 my-6">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-md w-full"
          >
            <SwiperSlide>
              <div className="w-full h-[220px] sm:h-[320px] md:h-[380px] bg-gray-100 flex items-center justify-center">
                <img src="https://images.uzum.uz/dap2a26ta8f7c95q6sn0/main_page_banner.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <section className="max-w-[1280px] mx-auto px-4 my-8">
          <h3 className="text-xl md:text-2xl font-bold mb-5 text-gray-900">Ommabop mahsulotlar</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => {
              const imageUrl = product.rasm 
                ? (product.rasm.startsWith('http') ? product.rasm : `https://uzmart-tz4u.onrender.com${product.rasm}`) 
                : "https://images.uzum.uz/cupefjs5j42bjc4eq1rg/t_product_540_high.jpg";

              return (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-200 p-3 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl mb-3">
                      <img src={imageUrl} alt="" className="rounded-xl object-cover w-full h-[180px] sm:h-[210px] hover:scale-105 transition duration-300" />
                    </Link>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="text-base font-bold text-gray-900 hover:text-[#8A00FF]">{product.narx} so'm</h4>
                      </Link>
                      {product.skidka > 0 && (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-semibold">-{product.skidka}</span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{product.tavsif}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 flex flex-col gap-2">
                    {product.rate && (
                      <div className="text-xs text-amber-500 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-star"></i> {product.rate}
                      </div>
                    )}
                    <button className="w-full bg-[#8A00FF] hover:bg-purple-700 active:scale-95 text-white py-2 rounded-xl text-xs font-semibold transition duration-150 cursor-pointer shadow-xs">
                      Buyurtma berish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-white mt-16 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">UzMart</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Kundalik ehtiyojlar uchun qulay, tez va ishonchli online market.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">Kompaniya</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-white transition">Kontaktlar</a></li>
                <li><a href="#" className="hover:text-white transition">Yangiliklar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">Mijozlar uchun</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition">Yetkazib berish</a></li>
                <li><a href="#" className="hover:text-white transition">Qaytarish</a></li>
                <li><a href="#" className="hover:text-white transition">Savol-javob</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">Aksiyalar</h4>
              <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50">
                <p className="text-xs text-gray-300 mb-2">Yangiliklardan xabardor bo'ling</p>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Email kiriting"
                    className="w-full bg-gray-900 text-white rounded-lg px-3 py-1.5 text-xs outline-none border border-gray-700"
                  />
                  <button className="bg-[#8A00FF] hover:bg-purple-700 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shrink-0">
                    Yuborish
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
            <span>© 2026 UzMart. Barcha huquqlar himoyalangan.</span>
            <div className="flex items-center gap-4 text-base">
              <i className="fa-brands fa-instagram hover:text-white cursor-pointer transition"></i>
              <i className="fa-brands fa-telegram hover:text-white cursor-pointer transition"></i>
              <i className="fa-brands fa-facebook-f hover:text-white cursor-pointer transition"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;