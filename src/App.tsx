import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { Product, Category, User } from './interface';
import { Login, Register, Users, UpdateUser, Home,Products  } from './export';
import { AddProduct, UpdateProduct, About, UpdateCategory, AddCategory, Categories} from './export';
import Homepage from './components/Homepage';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const products = await axios.get("http://localhost:3000/products");
      const category = await axios.get("http://localhost:3000/categories");
      const users = await axios.get("http://localhost:3000/users");
      
      setProducts(products.data);
      setCategory(category.data);
      setUsers(users.data);
    };
    getData();
  }, [])
  
  async function getCate(id:number | string)  {
      if(id === 1 || id === 2) {
        setProducts(products.filter((p: Product) => p.id === id));
      } else {
        const products = await axios.get("http://localhost:3000/products");
        setProducts(products.data);
      }
  }
  
  const addProduct = async (product: Product) => {
      try {
        await axios.post("http://localhost:3000/products", product);
        alert("Add Product");
      } catch (error) {
        console.log(error);
      }
  }

  const updProduct = async (id: number, product: Product) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
    } catch (error) {
      console.log(error);
    }
  }

  const delProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((item: Product) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const addCategory = async (category: Category) => {
    try {
      await axios.post("http://localhost:3000/categories", category);
      alert("Add successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const delCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategory(category.filter((item: Category) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const updCategory = async (id: number, category: Category) => {
    try {
      await axios.put(`http://localhost:3000/categories/${id}`, category);
    } catch (error) {
      console.log(error);
    }
  }

  const updUser = async (id: number, user: User) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Router>
        <Home />
        <Routes>
          <Route path='/' element={<Homepage products={products} getCate={getCate} />} />
          <Route path='/products' element={<Products products={products} delProduct={delProduct} />} />
          <Route path='/products/add' element={<AddProduct addProduct={addProduct} />} />
          <Route path='/products/update/:id' element={<UpdateProduct products={products} updProduct={updProduct}/>} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Routes>
          <Route path='/category' element={<Categories category={category}  delCategory={delCategory} />} />
          <Route path='/category/add' element={<AddCategory addCategory={addCategory}  />} />
          <Route path='/category/update/:id' element={<UpdateCategory updCategory={updCategory} category={category} />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<Login users={users}/>}/>
          <Route path='/register' element={<Register users={users} />}/>
        </Routes>
        <Routes>
          <Route path='/users' element={<Users users={users}/>} />
          <Route path='users/update/:id' element={<UpdateUser users={users} updUser={updUser} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
