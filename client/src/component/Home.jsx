import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [product , setProduct]=useState({})
    const [error,setError] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) =>{
         setProduct((product)=> ({
            ...product,[e.target.id] : e.target.value
         }))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // console.log(product);
        if(!product['name']||!product['price']||!product['category']){
            setError("please fill all required fields")
            setTimeout(()=>{
                setError(false)
            },3000)
            return;
        }
        const res = await fetch("/api/product",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(product)
        })
        const data = await res.json()
        // console.log(data)
        setTimeout(()=>{
            // console.log("object");
             navigate("/products")
        },300)
        
    }

  return (
    <div className=' w-screen h-screen bg-sky-100 flex flex-col  justify-center items-center'>
    <form onSubmit={handleSubmit} className='rounded-lg bg-white p-6 shadow shadow-slate-400 border-solid'>
      <h1 className='m-4 text-center font-semibold text-gray-600'>ADD PRODUCT</h1>
      <div className='m-4 underline decoration-1 decoration-slate-500'>
        <input onChange={handleChange} placeholder='Name . . .' className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400' type="text" id="name" />
      </div>
      <div className='m-4'>
        <input   onChange={handleChange}  placeholder='Price . . .' className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400' type="text" id="price" />
      </div>
      <div className='m-4'>
        <input  onChange={handleChange} placeholder='Category . . .' className='rounded-sm py-1 pl-2 pr-20 text-gray-500 ring-1 ring-gray-300 placeholder:text-gray-400' type="text" id="category" />
      </div>
      <div>
        <div className=' flex bg-sky-500 mx-4 rounded hover:bg-sky-400 justify-center items-center'>
          <button className='p-1 text-gray-300' type="submit">Add Product</button>
        </div>
        {!error ?  <p className="hidden">{error}</p>: <p className="text-red-400 text-center">{error}</p>}
      </div>
    </form>
  </div>
  )
}

export default Home
