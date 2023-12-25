import React, { useState } from 'react'

function Card({ image }) {
    const [pass, setPass] = useState("");
    const [show, setShow] = useState(true)
    const [error, setError] = useState(false)
    const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    // console.log("entery",image.password,pass)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass !== image.password) {
            setError("please enter correct password")
            setTimeout(()=>{
                  setError(false)
                  setPass("")
            },2000)
        }
        if (pass === image.password) {
            console.log(image.imageUrl)
            setUrl(image.imageUrl);
            setShow(!show);
        }

    }
    const handleChange = (e) => {
        setPass(e.target.value);
    }

    const handleDownload = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const downloadLink = document.createElement('a');
          const blobUrl = window.URL.createObjectURL(blob);
          downloadLink.href = blobUrl;
          const arr = url.split('/');
          downloadLink.download = arr[arr.length - 1];
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            setError("can't download image")
        }
      };
      
    return (
        <div className='flex rounded-full'>
            <div className='bg-transparent  flex flex-col justify-center items-center '>
                <img className='bg-white rounded-sm w-64 h-64 object-contain' src={url} alt={url} />
                {show ?
                    <form onSubmit={handleSubmit} className='flex gap-2 my-2' >
                        <input value={pass} onChange={handleChange} className='ring-1 pl-2 rounded-sm ' placeholder='enter password' type="password" />
                        {show && <button className='bg-blue-400 px-2 rounded-sm' type='submit'>show</button>}
                    </form>
                    :
                    <button onClick={handleDownload} className='bg-blue-400 m-2 w-full cursor-pointer rounded-sm' type='submit'>dowload</button>
                }
                {error && <p className='text-red-500 '>{error}</p>}
            </div>
        </div>
    )
}

export default Card
