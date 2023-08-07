import { useForm } from 'react-hook-form';
import { User } from '../../interface';
import { useNavigate, Link  } from 'react-router-dom';
import bcrypt from 'bcryptjs';

interface Props {
    users: User[];
}

const Login = ({ users }: Props) => {
    const navigate = useNavigate();
    const { register,handleSubmit } = useForm<User>();

    const onSubmit = (data: User) => {
        const user = users.find((u: User) => u.name === data.name);
        if(!user) {
            alert("user not found");
            return;
        }

        const matched = bcrypt.compareSync(data.password, user.password);
        if(!matched) {
            alert("Wrong password")
            return;
        } else {
            navigate('/home')
            alert("Login successful");
        }
    }
  return (
    <div className="container">
        <h1 className='text-center'>Login</h1>
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
                        <Link to="/register" className='btn btn-warning'>Sign Up</Link>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    </div>
  )
}

export default Login