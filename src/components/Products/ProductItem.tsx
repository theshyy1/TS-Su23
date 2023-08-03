import { Product } from '../../interface'

interface Props {
    // product: Product;
    // id: string | number;
    // name: string;
    // price: number;
    // image?: string;
    product: Product;
    delProduct: (id: number) => void;
}

const ProductItem = ({product, delProduct}: Props) => {
    const { id, name, price, image } = product;
  return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{image}</td>
            <td>
                <button onClick={() => delProduct(id)} className='bg-blue-400'>Del</button>
                <a href={`/products/update/${id}`}>Update</a>
            </td>
        </tr>
  )
}

export default ProductItem