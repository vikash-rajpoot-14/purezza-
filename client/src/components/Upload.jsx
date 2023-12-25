import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const initialFormData = { password: "", detail: "" };
  const [formdata, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/image/upload", formdata);
      setLoading(false);

      setFormData(initialFormData);
      document.getElementById('image').value = "";
    } catch (error) {
      setLoading(false);
    }
  };

  const TranformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev, image: reader.result
        }));
      };
    } else {
      setFormData((prev) => ({
        ...prev, image: ""
      }));
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      TranformFile(e.target.files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.id]: e.target.value,
      }));
    }
  };

  return (
    <div className='bg-sky-100'>
      <div className='w-screen h-screen flex flex-col justify-start items-center'>
        <form onSubmit={handleSubmit} className='mt-20 rounded-lg bg-white p-6 shadow shadow-slate-400 border-solid'>
          <h1 className='m-4 text-center font-semibold text-gray-600'>ADD PRODUCT</h1>
          <div className='m-4 underline decoration-1 decoration-slate-500'>
            <input
              onChange={handleChange}
              placeholder='file'
              className='text-gray-500 ring-1 ring-gray-300 file:mr-4 file:py-1 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-300 file:text-gray-500
              hover:file:bg-sky-200 hover:cursor-pointer'
              accept='image/*'
              type="file"
              name="file"
              id="image"
            />
          </div>
          <div className='m-4'>
            <input
              onChange={handleChange}
              className='pl-5 pr-24 text-gray-500 ring-1 ring-gray-300 '
              placeholder='password'
              type="password"
              name="password"
              value={formdata.password}
              id="password"
            />
          </div>
          <div className='m-4'>
            <input
              onChange={handleChange}
              className='pl-5 pr-24 text-gray-500 ring-1 ring-gray-300 '
              placeholder='details'
              type="text"
              name='detail'
              value={formdata.detail}
              id='detail'
            />
          </div>
          <div>
            <div className='flex bg-sky-500 mx-4 rounded hover:bg-sky-400 justify-center items-center'>
              <button className='cursor-pointer w-full uppercase text-gray-300' disabled={loading} type='submit'>
                {!loading ? "upload" : "uploading.."}
              </button>
            </div>
          </div>
        </form>
        {formdata.image && (
          <img className='w-96 h-96 object-contain' src={formdata?.image} alt={formdata?.image} />
        )}
      </div>
    </div>
  );
}

export default Upload;
