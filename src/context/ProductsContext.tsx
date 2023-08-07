import { createContext, useState,useEffect, ReactNode } from "react";
import axios from 'axios';
import { Product } from "../interface";

interface Props {
    children: ReactNode
}

type ProductContextInit = {
    products: Product[],
    addProduct: (product: Product) => Promise<void>
    delProduct: (id: number) => void;
    updProduct: (id: number, product: Product) => void;
    getCate: (id: number | string) => void;
}

export const ProductContext = createContext({} as ProductContextInit);
const ProductContextProvider = ({ children }: Props) => { 
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const products = await axios.get("http://localhost:3000/products");
      setProducts(products.data);
    };
    getData();
  }, [])

  const addProduct = async (product: Product) => {
    try {
            await axios.post("http://localhost:3000/products", product);
            alert("Add Product");
        } catch (error) {
        console.log(error);
        }
    }

    const updProduct = async (id: number, product: Product) => {
    try {
        await axios.put(`http://localhost:3000/products/${id}`, product);
    } catch (error) {
        console.log(error);
     }
    }

    const delProduct = async (id: number) => {
    try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter((item: Product) => item.id !== id));
    } catch (error) {
        console.log(error);
        }
    }

    async function getCate(id:number | string)  {
        if(id === 1 || id === 2) {
          setProducts(products.filter((p: Product) => p.id === id));
        } else {
          const products = await axios.get("http://localhost:3000/products");
          setProducts(products.data);
        }
    }

    // Data
    const ProductContextData = {
        products,
        addProduct,
        delProduct,
        updProduct,
        getCate
    }

    return (
        <ProductContext.Provider value={ProductContextData}>
            { children }    
        </ProductContext.Provider>
    )
} 

export default ProductContextProvider;