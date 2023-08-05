import React from 'react'
import { Product } from '../interface'

interface Props {
  products: Product[];
  getCate: (id: number | string) => void;
}

const Homepage = ({ products, getCate }: Props) => {
  return (
    <div className="container">
      <div className="container-btn">
        <button className='btn btn-primary' onClick={getCate.bind(this, 'all')}>All</button>
        <button className='btn btn-primary' onClick={getCate.bind(this, 1)}>Cate1</button>
        <button className='btn btn-primary' onClick={getCate.bind(this, 2)}>Cate2</button>
      </div>
      <div className="row gap-4 m-4">
        { products.map((product: Product) => {
          return (
            <div className="card col-4 col-span-4" style={{width: 18 + 'rem'}}>
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