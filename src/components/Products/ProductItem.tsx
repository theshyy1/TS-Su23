import { Product } from '../../interface'

interface Props {
    product: Product;
    delProduct: (id: number) => void;
}

const ProductItem = ({product, delProduct}: Props) => {
    const { id, name, price, image, categoryId } = product;
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