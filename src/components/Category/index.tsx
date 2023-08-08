import React, { useContext } from 'react'
import { Category } from '../../interface'
import CateItem from './CateItem';
import { CategoriesContext } from '../../context/CategoriesContext';

// interface Props {
//     category: Category[];
//     delCategory: (id: number) => void;
// }

const Categories = () => {
    const { delCategory, category } = useContext(CategoriesContext);
    
  return (
    <> 
        <div className="container">
            <h1>Category</h1>
            <a href="/admin/category/add" className='btn btn-success'>ADD NEW</a>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { category.map((cate: Category) => {
                        return (
                            <CateItem key={cate.id} cate={cate} delCategory={delCategory}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
    
  )
}

export default Categories