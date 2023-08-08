import { useForm } from 'react-hook-form';
import { Role, User } from '../../interface';
import { useNavigate, useParams  } from 'react-router-dom';
import Joi from 'joi';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const UserSchema = Joi.object({
    name: Joi.string().trim().required(),
    password: Joi.string().required(),
    roleId: Joi.number()
})

// interface Props {
//     users: User[];
//     updUser: (id: number, user: User) => Promise<void>
// }

const AddUser = () => {
    const navigate = useNavigate();
    const { register,handleSubmit } = useForm<User>();

    const { addUser, roles } = useContext(UserContext);

    const onSubmit = async (data: User) => {
        const { error } = UserSchema.validate(data);
        if(error) {
            alert(error.message);
            return;
        }

        await addUser(data);
        navigate("/login");
        alert("Update user successfully");
    }

  return (
    <div className="container">
        <h1 className='text-center'>Create new user</h1>
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
                    <label className="form-label">RoleID</label>
                    <select  id="" {...register('roleId')}>
                        <option disabled value="">Chon Role</option>
                        {
                            roles.map((role: Role) => {
                                return (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    </div>
  )
}

export default AddUser