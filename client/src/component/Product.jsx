import React, { useEffect, useState } from 'react'
import Card from './Card'

function Product() {
    const [products, setProduct] = useState([])
    // console.log(products)
    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch("/api/products")
            const data = await res.json()
            // console.log(data)
            setProduct(data.products)
        }
        fetchProduct()
    }, [])


    return (
        <div className='mt-20'>
            <h1 className='text-xl text-center uppercase font-semibold'>products</h1>
            <div className='flex gap-20 justify-center items-center mt-10 flex-wrap '>
            {products?.map((product,i) => <div key={product._id}><Card setProduct={setProduct} product={product}/></div>)}
            </div>
        </div>
    )
}

export default Product
