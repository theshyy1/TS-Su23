import { useState, useEffect, ReactNode, createContext } from "react";
import { User } from "../interface";
import axios from 'axios';

interface Props {
    children: ReactNode
}
type UserContextInit = {
    users: User[],
    updUser: (id: number, user: User) => Promise<void>
}

export const UserContext = createContext({} as UserContextInit);
const UserContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const users = await axios.get("http://localhost:3000/users");
      setUsers(users.data);
    };
    getData();
  }, [])

  const updUser = async (id: number, user: User) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
    } catch (error) {
      console.log(error);
    }
  }

  //Data
  const UserContextData = {
    users,
    updUser
  }

  return (
    <UserContext.Provider value={UserContextData}>
        { children }
    </UserContext.Provider>
  )
  
}

export default UserContextProvider;