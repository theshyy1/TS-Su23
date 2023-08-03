import React, { useEffect } from 'react'
import { Product } from '../../interface'
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

interface Props {
    products: Product[];
    updProduct: (id: number, product: Product) => void;
}


const UpdateProduct = ( props: Props ) => {
    const { id } = useParams();
    const { products, updProduct } = props;

    const {
        register,
        handleSubmit,
        reset
    } = useForm<Product>();
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentProduct = products.find((product: Product) => product.id === Number(id));
        reset(currentProduct)
    }, [props])

    const onSubmit = async (data: Product) => {
        await updProduct(Number(id), data);
        navigate("/products");
    }

  return (
    <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
                <div className="mb-3">
                <label className="form-label">Name</label>
                <input placeholder='Enter name product' id="name"  {...register('name')}  />
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

export default UpdateProduct