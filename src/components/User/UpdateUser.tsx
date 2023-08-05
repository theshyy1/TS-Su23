import { useForm } from 'react-hook-form';
import { User } from '../../interface';
import { useNavigate, useParams  } from 'react-router-dom';
import Joi from 'joi';
import { useEffect } from 'react';

const UserSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().trim().required(),
    password: Joi.string().required(),
    roleId: Joi.number()
})

interface Props {
    users: User[];
    updUser: (id: number, user: User) => Promise<void>
}

const UpdateUser = (props: Props) => {
    const navigate = useNavigate();
    const { register,handleSubmit, reset } = useForm<User>();
    const { id } = useParams();
    const { users, updUser } = props;

    useEffect(() => {
        const currentProduct = users.find((user: User) => user.id === Number(id));
        reset(currentProduct)
    }, [props])

    const onSubmit = async (data: User) => {
        const { error } = UserSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }
        await updUser(Number(id), data);
        navigate("/login");
        alert("Update user successfully");
    }

  return (
    <div className="container">
        <h1 className='text-center'>Register</h1>
        <div className="">
            <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                <label className="form-label">Email address</label>
                    <input type="text" className="form-control" placeholder="Enter your email" {...register('name')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" {...register('password')}/>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">
                        Remember me
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateUser