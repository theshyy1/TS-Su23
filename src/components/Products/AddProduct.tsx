import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Product } from '../../interface';

interface Props {
    addProduct: (product: Product) => Promise<void>
}

const AddProduct = ({ addProduct}: Props) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<Product>();

    const onSubmit = async (data: Product) => {
        await addProduct(data);
        navigate('/products');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
                <div className="mb-3">
                <label className="form-label">Name</label>
                <input placeholder='Enter name product' id="name"  {...register('name')} />
                </div>
                <div className="mb-3">
                <label className="form-label">Image</label>
                <input placeholder='Image product' id='image' className='form-control' {...register('image', { required: true })} />
                </div>
                <div className="mb-3">
                <label className="form-label">Price</label>
                <input placeholder='price product' id="price" className='form-control' {...register('price', { pattern: /\d+/ })} />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default AddProduct