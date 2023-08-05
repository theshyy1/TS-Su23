import { Product } from '../../interface'
import ProductItem from './ProductItem';

interface Props {
    products: Product[];
    delProduct: (id: number) => void;
}

const Products = ({products, delProduct}: Props) => {
  return (
    <div className='text-center container'>
        <h1 className='text-center text-3xl'>Table Products</h1>
        <a href="/products/add" className='btn btn-secondary'>ADD ITEM</a>
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
                        <ProductItem key={item.id} product={item} delProduct={delProduct} />
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Products