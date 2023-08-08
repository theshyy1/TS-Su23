import React, { useContext } from 'react'
import { Category, Product } from '../interface'
import { ProductContext } from '../context/ProductsContext';
import { CategoriesContext } from '../context/CategoriesContext';

// interface Props {
//   getCate: (id: number | string) => void;
// }

const Homepage = () => {
  const { products, getCate } = useContext(ProductContext);
  const { category } = useContext(CategoriesContext);

  return (
    <div className="container">
      <div className="container-btn">
        <button className='btn btn-primary' onClick={() => getCate('all')}>All</button>
        {
          category.map((cate: Category) => {
            return <button key={cate.id} className='btn btn-primary' onClick={getCate.bind(this, cate.id)}>{cate.name}</button>
          })
        }
      </div>
      <div className="row gap-4 m-4">
        { products.map((product: Product) => {
          return (
            <div className="card col-4 col-span-4" style={{width: 18 + 'rem'}} key={product.id}>
                <img src={product.image} className="card-img-top p-2" alt={product.name}/>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <a href="#" className="btn btn-primary">Add to cart</a>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Homepage