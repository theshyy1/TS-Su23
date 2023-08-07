import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { Category } from '../../interface';
import Joi from 'joi';
import { CategoriesContext } from '../../context/CategoriesContext';
import { useContext } from 'react';


// interface Props {
//     category: Category[];
//     updCategory: (id: number, category: Category) => Promise<void>
// }

const CateSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().trim().required()
})

const UpdateCategory = () => {
    const { id } = useParams();
    const { category, updCategory } = useContext(CategoriesContext);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        reset
        } = useForm<Category>();

    useEffect(() => {
        const currentProduct = category.find((cate: Category) => cate.id === Number(id));
        reset(currentProduct)
    }, [category])
    
    const onSubmit = async (data: Category) => {
        const { error } = CateSchema.validate(data);
        if(error) {
            alert(error);
            return;
        }

        await updCategory(Number(id),data);
        navigate('/category');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input placeholder='Enter name Cate' id="name" className='form-control' {...register('name')} />
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default UpdateCategory