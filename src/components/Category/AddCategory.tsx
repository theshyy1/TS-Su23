import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Category } from '../../interface';
import joi from 'joi';
import { CategoriesContext } from '../../context/CategoriesContext';
import { useContext } from 'react';


// interface Props {
//     addCategory: (category: Category) => Promise<void>
// }

const CateSchema = joi.object({
    name: joi.string().trim().required()
})

const AddCategory = () => {
    const { addCategory, category } = useContext(CategoriesContext);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit
        } = useForm<Category>();

    const onSubmit = async (data: Category) => {
        const { error } = CateSchema.validate(data);
        const matched = category.find((cate: Category) => cate.name === data.name);
        if(error) {
            alert(error.message);
            return;
        }

        if(matched) {
            alert("Category already exists");
            return;    
        }
        

        await addCategory(data);
        navigate('/admin/category');
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

export default AddCategory