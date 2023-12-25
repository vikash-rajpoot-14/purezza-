import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ product , setProduct}) {
  const navigate = useNavigate()

  const handleUpdate =async (id,product)=>{
    // console.log(id)
    // console.log(product)
    navigate(`/products/${id}`,{ state: { product } })
  }

  const handleDelete = async(id)=>{
     await fetch(`/api/product/${id}`,{
      method: 'DELETE'
    })
    const res = await fetch("/api/products")
    const data = await res.json()
    // console.log(data)
    setProduct(data.products)
  }
  return (
    <div className='relative  rounded-lg flex flex-col h-72 w-64 bg-white p-4 shadow shadow-slate-400 border-solid'>
      <h1 className=' text-2xl uppercase text-center font-semibold text-gray-600'>{product.name}</h1>
        <p className='mt-8 text-lg p-2 text-center'>price : $ {product.price}</p>
        <p className=' text-lg p-2 text-center' >category : {product.category}</p>
      <div className='flex absolute bottom-4 justify-center items-center'>
        <button onClick={()=>handleUpdate(product._id,product)} className='p-1 text-sm bg-sky-500 mx-4 rounded hover:bg-sky-400  text-gray-300' type="submit">Update Product</button>
        <button onClick={()=>handleDelete(product._id)} className='p-1 text-sm bg-red-500 mx-4 rounded hover:bg-red-400  text-gray-300' type="submit">Delete Product</button>
      </div>
    </div>
  )
}

export default Card
