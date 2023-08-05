import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Product } from '../../interface';
import joi from 'joi';

interface Props {
    addProduct: (product: Product) => Promise<void>
}

const ProductSchema = joi.object({
    name: joi.string().trim().required(),
    price: joi.number().integer().min(1).required(),
    image: joi.string().trim().required(),
    description: joi.string().trim().required(),
    categoryid: joi.string().trim().required()
})

const AddProduct = ({ addProduct}: Props) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
        } = useForm<Product>();
    
    const onSubmit = async (data: Product) => {
        const { error } = ProductSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }

        await addProduct(data);
        navigate('/products');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input placeholder='Enter name product' id="name" className='form-control' {...register('name')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input placeholder='Image product' id='image' className='form-control' {...register('price', { required: true })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input placeholder='price product' id="price" className='form-control' {...register('image', { pattern: /\d+/ })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input placeholder='Desc product' id='image' className='form-control' {...register('description', { required: true })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">CategoryId</label>
                    <input placeholder='Category product' id="price" className='form-control' {...register('categoryId', { pattern: /\d+/ })} />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default AddProduct