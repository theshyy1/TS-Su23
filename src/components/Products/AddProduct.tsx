import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Category, Product } from '../../interface';
import joi from 'joi';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductsContext';
import { CategoriesContext } from '../../context/CategoriesContext';

// interface Props {
//     addProduct: (product: Product) => Promise<void>
// }

const ProductSchema = joi.object({
    name: joi.string().trim().required(),
    price: joi.number().integer().min(1).required(),
    image: joi.string().trim().required(),
    description: joi.string().trim().required(),
    categoryId: joi.string().trim().required()
})

const AddProduct = () => {
    const { addProduct } = useContext(ProductContext);
    const { category } = useContext(CategoriesContext);
    const { register, handleSubmit } = useForm<Product>();
    console.log(category);
    
    const navigate = useNavigate();
    const onSubmit = async (data: Product) => {
        const { error } = ProductSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }
        
        await addProduct(data);
        navigate('/admin/products');
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
                    <select id="" {...register('categoryId')}>
                        <option value="" disabled>Chon 1</option>
                        { category.map((cate: Category) => {
                            return (
                                <option key={cate.id} value={cate.id}>{cate.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default AddProduct