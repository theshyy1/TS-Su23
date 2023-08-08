import { useContext } from 'react';
import { Product } from '../../interface'
import ProductItem from './ProductItem';
import { ProductContext } from '../../context/ProductsContext';

// interface Props {
//     products: Product[];
//     delProduct: (id: number) => void;
// }

const Products = () => {
    const { products } = useContext(ProductContext);
    
  return (
    <div className='text-center container'>
        <h1 className='text-center text-3xl'>Table Products</h1>
        <a href="/admin/products/add" className='btn btn-secondary'>ADD ITEM</a>
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>CategoryId</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { products.map((item: Product) => {
                    return (
                        <ProductItem key={item.id} product={item} />
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Products