import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://uzmart-tz4u.onrender.com/product/?category=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Serverda xatolik yuz berdi!');
        }
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setProducts(list);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white border border-gray-200 text-gray-800 px-6 py-4 rounded-xl shadow-xs text-center text-sm font-medium">
          Xatolik chiqdi: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans text-gray-800">
      <div className="max-w-[1280px] mx-auto my-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-6 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition shadow-xs"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i> Asosiy sahifa
        </Link>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 tracking-tight">
          Mahsulotlar
        </h3>

        {products.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-xs">
            <p className="text-gray-500 text-sm">Bu kategoriyada hozircha mahsulotlar yo'q.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => {
              const imageUrl = product.rasm
                ? (product.rasm.startsWith('http') ? product.rasm : `https://uzmart-tz4u.onrender.com${product.rasm}`)
                : 'https://images.uzum.uz/cupefjs5j42bjc4eq1rg/t_product_540_high.jpg';

              return (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition duration-200 p-3 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl mb-3 w-full aspect-square">
                      <img 
                        src={imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover rounded-xl hover:scale-105 transition duration-300" 
                      />
                    </Link>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="text-base font-bold text-gray-900 hover:text-[#8A00FF] transition">{product.narx} so'm</h4>
                      </Link>
                      {product.skidka > 0 && (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-semibold">-{product.skidka}%</span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{product.tavsif}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-50 flex flex-col gap-2">
                    {product.rate && (
                      <div className="text-xs text-amber-500 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-star"></i> Reyting: {product.rate}
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
        )}
      </div>
    </div>
  );
}

export default Category;