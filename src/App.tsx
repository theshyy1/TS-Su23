import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import axios from 'axios';
import About from './components/About';
import { Product } from './interface';
import AddProduct from './components/Products/AddProduct';
import UpdateProduct from './components/Products/UpdateProduct';

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    }
    getData();
  }, [])
  
  const addProduct = async (product: Product) => {
      try {
        const addPro = await axios.post("http://localhost:3000/products", product);
        alert({ msg: "Add Product", product: addPro});
      } catch (error) {
        console.log(error);
      }
  }

  const updProduct = async (id: number, product: Product) => {
    try {
      const updated = await axios.put(`http://localhost:3000/products/${id}`, product);
    } catch (error) {
      console.log(error);
    }
  }

  const delProduct = async (id: number) => {
    try {
      const del = await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((item: Product) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products products={products} delProduct={delProduct} />} />
          <Route path='/products/add' element={<AddProduct addProduct={addProduct} />} />
          <Route path='/products/update/:id' element={<UpdateProduct products={products} updProduct={updProduct}/>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
