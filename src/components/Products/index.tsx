import React from 'react'
import { Product } from '../../interface'
import ProductItem from './ProductItem';

interface Props {
    products: Product[];
    delProduct: (id: number) => void;
}

const Products = ({products, delProduct}: Props) => {
    
  return (
    <div className='text-center'>
        <h1 className='text-center text-3xl'>Table Products</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                { products.map((item: Product) => {
                    return (
                        <ProductItem key={item.id} product={item} delProduct={delProduct} />
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Products