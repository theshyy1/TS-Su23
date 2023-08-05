import { User } from '../../interface'

interface Props {
    users: User[];
}

const Users = ({ users }: Props) => {
  return (
    <div className='container'>
        <h1 className='text-center'>All Users</h1>
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
                                <button className='btn btn-warning'>Del</button>
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