import { useContext } from 'react';
import { User } from '../../interface'
import { UserContext } from '../../context/UserContext';

// interface Props {
//     users: User[];
// }

const Users = () => {
    const { users, delUser } = useContext(UserContext);
  return (
    <div className='container'>
        <h1 className='text-center'>All Users</h1>
        <a href="/admin/users/add" className='btn btn-secondary'>ADD USER</a>
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { users.map((user: User) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.roleId}</td>
                            <td>
                                <button onClick={delUser.bind(this, user.id)} className='btn btn-warning'>Del</button>
                                <a href={`/users/update/${user.id}`} className='btn btn-secondary'>Update</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Users