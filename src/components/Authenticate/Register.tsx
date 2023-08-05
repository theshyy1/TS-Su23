import axios from 'axios';
import { useForm } from 'react-hook-form';
import { User } from '../../interface';
import { useNavigate  } from 'react-router-dom';
import Joi from 'joi';

const UserSchema = Joi.object({
    name: Joi.string().trim().required(),
    password: Joi.string().required()
})

const Register = () => {
    const navigate = useNavigate();
    const { register,handleSubmit } = useForm<User>();

    const onSubmit = async (data: User) => {
        const { error } = UserSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }
        await axios.post("http://localhost:3000/users", data);
        navigate("/login");
        alert("Create a new user successfully");
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register