import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login, Register, Users, UpdateUser, Home,Products  } from './export';
import { AddProduct, UpdateProduct, About, UpdateCategory, AddCategory, Categories} from './export';
import Homepage from './components/Homepage';

import CategoriesContextProvider from './context/CategoriesContext';
import ProductContextProvider from './context/ProductsContext';
import UserContextProvider from './context/UserContext';

const App = () => {
  return (
    <>
      <Router>
        <Home />
        <ProductContextProvider>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
          </Routes>
        </ProductContextProvider>
          <CategoriesContextProvider>
            <Routes>
                <Route path='/category' element={<Categories />} />
                <Route path='/category/add' element={<AddCategory />} />
                <Route path='/category/update/:id' element={<UpdateCategory />} />
            </Routes>
          </CategoriesContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
            </Routes>
          </UserContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='users/update/:id' element={<UpdateUser />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </>
  )
}

export default App
