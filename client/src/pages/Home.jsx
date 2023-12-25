import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import { useSelector } from 'react-redux';

function Home() {
  const [image,setImage] = useState([])
  const { loading, error,currentUser } = useSelector((state) => state.user);
//  console.log(loading,error,currentUser)
  const navigate = useNavigate();
  const handleClick =()=>{
    navigate('/upload')
  }

  useEffect(()=>{
   async function fetchImages(){
      const images = await fetch("/api/image")
      const data = await images.json();
      // console.log(data)
      setImage(data.image)
   }
   fetchImages()
  },[])

  return (
    <div className='bg-sky-200'>
      <div onClick={handleClick} className='flex justify-center p-4'>
      <button className='bg-sky-500 p-2 rounded'>Upload New Image</button>
      </div>
      <div className=' flex flex-wrap gap-10 m-4 p-4'>
        {image.map((img,idx)=> <div key={img._id}><Card image={img}/></div>)}
      </div>
    </div>
  )
}

export default Home
