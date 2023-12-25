import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Product from './component/Product'
import Header from './component/Header'
import Update from './component/Update'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/products/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
