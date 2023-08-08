import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login, Register, Users, UpdateUser, Home,Products, Homepage  } from './export';
import { AddProduct, UpdateProduct, About, UpdateCategory, AddCategory, Categories} from './export';

import CategoriesContextProvider from './context/CategoriesContext';
import ProductContextProvider from './context/ProductsContext';
import UserContextProvider from './context/UserContext';
import AddUser from './components/User/AddUser';

const App = () => {
  return (
    <>
      <Router>
        <Home />
          <CategoriesContextProvider>
            <ProductContextProvider>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='admin/products' element={<Products />} />
                <Route path='admin/products/add' element={<AddProduct />} />
                <Route path='admin/products/update/:id' element={<UpdateProduct />} />
              </Routes>
            </ProductContextProvider>
            <Routes>
                <Route path='admin/category' element={<Categories />} />
                <Route path='admin/category/add' element={<AddCategory />} />
                <Route path='admin/category/update/:id' element={<UpdateCategory />} />
            </Routes>
          </CategoriesContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='admin/users/add' element={<AddUser />} />
            </Routes>
          </UserContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/users/update/:id' element={<UpdateUser />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </>
  )
}

export default App
