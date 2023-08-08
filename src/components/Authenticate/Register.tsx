import axios from 'axios';
import { useForm } from 'react-hook-form';
import { User } from '../../interface';
import { useNavigate  } from 'react-router-dom';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import background from '../../assets/background.jpg';

// interface Props {
//     users: User[];
// }

const UserSchema = Joi.object({
    name: Joi.string().trim().required(),
    password: Joi.string().required(),
    confirmpassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password is not match"
    })
})

const Register = () => {
    const navigate = useNavigate();
    const { register,handleSubmit } = useForm<User>();
    const { users } = useContext(UserContext);

    const onSubmit = async (data: User) => {
        const { error } = UserSchema.validate(data);
        
        if(error) {
            alert(error.details.map(err => err.message));
            return;
        }

        const userMatched = users.find((u: User) => u.name === data.name);
        if(userMatched) {
            alert("User already exists");
            return;
        }
        const hashPassword = bcrypt.hashSync(data.password, 10);

        const newUser = { name: data.name, password: hashPassword, roleId: 2 };
        await axios.post("http://localhost:3000/users", newUser);
        navigate("/login");
        alert("Create a new user successfully");
    }

  return (
    <div className="container">
        <h1 className='text-center'>Register</h1>
        <div>
            <img src={background} style={{width: '100%', position: 'fixed', top: '0', left: '0', opacity: '.6', zIndex: '-5'}} />
        </div>
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
                    <label className="form-label">Confirm password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" {...register('confirmpassword')}/>
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