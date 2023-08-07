import { useContext } from 'react';
import { Product } from '../../interface'
import { ProductContext } from '../../context/ProductsContext';

interface Props {
    product: Product;
}

const ProductItem = ({product}: Props) => {
    const { id, name, price, image, categoryId } = product;
    const { delProduct } = useContext(ProductContext);

  return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{image}</td>
            <td>{categoryId}</td>
            <td>
                <button onClick={() => delProduct(id)} className='btn btn-primary'>Del</button>
                <a href={`/products/update/${id}`} className='btn btn-warning'>Update</a>
            </td>
        </tr>
  )
}

export default ProductItem