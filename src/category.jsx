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
    return <div className="text-red-500 p-[20px] text-center">Xatolik chiqdi: {error}</div>;
  }

  return (
    <div className="min-h-[100vh] bg-gray-50 p-[16px]">
      <div className="max-w-[1280px] mx-[auto] my-[32px]">
        <Link to="/" className="inline-block mb-[20px] border border-gray-300 px-[16px] py-[8px] rounded-[8px] text-[14px] hover:bg-gray-100 transition">
          ← Asosiy sahifa
        </Link>
        
        <h3 className="text-[24px] font-bold mb-[24px] text-gray-900">
        Mahsulotlar
        </h3>

        {products.length === 0 ? (
          <p className="text-gray-500 text-[14px]">Bu kategoriyada hozircha mahsulotlar yo'q.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px]">
            {products.map((product) => {
              const imageUrl = product.rasm
                ? (product.rasm.startsWith('http') ? product.rasm : `https://uzmart-tz4u.onrender.com${product.rasm}`)
                : 'https://images.uzum.uz/cupefjs5j42bjc4eq1rg/t_product_540_high.jpg';

              return (
                <div key={product.id} className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-[12px] flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <img src={imageUrl} alt="" className="rounded-[12px] object-cover w-full h-[240px] mb-[12px]" />
                    </Link>

                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <Link to={`/product/${product.id}`}>
                        <h4 className="text-[18px] font-bold text-gray-900 hover:text-purple-600 transition">{product.narx} so'm</h4>
                      </Link>
                      {product.skidka > 0 && (
                        <span className="text-[12px] bg-red-100 text-red-600 px-[6px] py-[2px] rounded-[4px] font-medium">-{product.skidka}%</span>
                      )}
                    </div>

                    <p className="text-[12px] text-gray-600 line-clamp-2 mt-[4px]">{product.tavsif}</p>
                  </div>

                  <div className="mt-[16px] pt-[8px] border-t border-gray-100">
                    {product.rate && (
                      <div className="text-[12px] text-amber-500 mb-[8px] font-medium">Reyting: {product.rate}</div>
                    )}
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-[8px] rounded-[12px] text-[14px] font-medium transition cursor-pointer">
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