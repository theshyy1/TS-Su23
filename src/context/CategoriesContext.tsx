import { createContext, useState, useEffect, ReactNode } from 'react';
import { Category } from '../interface';
import axios from 'axios';


interface Props {
  children: ReactNode
}

type CateContextProps = {
  category: Category[],
  addCategory: (category: Category) => Promise<void>
  delCategory: (id: number) => void;
  updCategory: (id: number, category: Category) => Promise<void>
}

export const CategoriesContext = createContext({} as CateContextProps);
const CategoriesContextProvider = ( {children}: Props) => {
  const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        const getData = async () => {
          const category = await axios.get("http://localhost:3000/categories");
          setCategory(category.data);
        };
        getData();
      }, [])

      const addCategory = async (category: Category) => {
        try {
          await axios.post("http://localhost:3000/categories", category);
          alert("Add successfully");
        } catch (error) {
          console.log(error);
        }
      }
    
      const delCategory = async (id: number) => {
        try {
          await axios.delete(`http://localhost:3000/categories/${id}`);
          setCategory(category.filter((item: Category) => item.id !== id));
        } catch (error) {
          console.log(error);
        }
      }
    
      const updCategory = async (id: number, category: Category) => {
        try {
          await axios.put(`http://localhost:3000/categories/${id}`, category);
        } catch (error) {
          console.log(error);
        }
      }
    
      // Data context
      const CategoriesContextData = {
        category,
        addCategory,
        delCategory,
        updCategory
      }

      return (
        <CategoriesContext.Provider value={CategoriesContextData}>
        { children }
        </CategoriesContext.Provider>
      )

}

export default CategoriesContextProvider;
