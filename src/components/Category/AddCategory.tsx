import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Category } from '../../interface';
import joi from 'joi';

interface Props {
    addCategory: (category: Category) => Promise<void>
}

const CateSchema = joi.object({
    name: joi.string().trim().required
})

const AddCategory = ({ addCategory }: Props) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
        } = useForm<Category>();

    const onSubmit = async (data: Category) => {
        const { error } = CateSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }
        await addCategory(data);
        navigate('/categories');
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