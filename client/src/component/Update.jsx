import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Update() {

  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const product = location.state.product;
//   console.log(id,product);

  const [error, setError] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
  });

  const handleChange =  (e) => {
     setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(updatedProduct);
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.category) {
      setError("Please fill all required fields");
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const res = await fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    // console.log("data",data)
    navigate("/products");
  };

  return (
    <div className='w-screen h-screen bg-sky-100 flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='rounded-lg bg-white p-6 shadow shadow-slate-400 border-solid'>
        <h1 className='m-4 text-center font-semibold text-gray-600'>UPDATE PRODUCT</h1>
        <div className='m-4 underline decoration-1 decoration-slate-500'>
          <input
            onChange={handleChange}
            value={updatedProduct.name}
            placeholder='Name...'
            className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400'
            type="text"
            id="name"
          />
        </div>
        <div className='m-4'>
          <input
            onChange={handleChange}
            value={updatedProduct.price}
            placeholder='Price...'
            className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400'
            type="text"
            id="price"
          />
        </div>
        <div className='m-4'>
          <input
            onChange={handleChange}
            value={updatedProduct.category}
            placeholder='Category...'
            className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400'
            type="text"
            id="category"
          />
        </div>
        <div>
          <div className='flex bg-sky-500 mx-4 rounded hover:bg-sky-400 justify-center items-center'>
            <button className='p-1 text-gray-300' type="submit">
              Update Product
            </button>
          </div>
          {!error ? (
            <p className="hidden">{error}</p>
          ) : (
            <p className="text-red-400 text-center">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Update;
