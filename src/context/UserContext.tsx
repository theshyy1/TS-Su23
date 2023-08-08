import { useState, useEffect, ReactNode, createContext } from "react";
import { Role, User } from "../interface";
import axios from 'axios';

interface Props {
    children: ReactNode
}
type UserContextInit = {
    users: User[],
    roles: Role[],
    updUser: (id: number, user: User) => Promise<void>
    addUser: (user: User) => Promise<void>
    delUser: (id: number) => Promise<void>
}

export const UserContext = createContext({} as UserContextInit);
const UserContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const getData = async () => {
      const users = await axios.get("http://localhost:3000/users");
      const {data} = await axios.get("http://localhost:3000/roles");
      setRoles(data)
      setUsers(users.data);
    };
    getData();
  }, [])

  const addUser= async (user: User) => {
    try {
      await axios.post(`http://localhost:3000/users`, user);
    } catch (error) {
      console.log(error);
    }
  }

  const updUser = async (id: number, user: User) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
    } catch (error) {
      console.log(error);
    }
  }
  const delUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((item: User) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  //Data
  const UserContextData = {
    users,
    updUser,
    addUser,
    delUser,
    roles
  }

  return (
    <UserContext.Provider value={UserContextData}>
        { children }
    </UserContext.Provider>
  )
  
}

export default UserContextProvider;