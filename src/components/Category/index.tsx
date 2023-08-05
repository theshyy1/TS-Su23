import React from 'react'
import { Category } from '../../interface'
import CateItem from './CateItem';

interface Props {
    category: Category[];
    delCategory: (id: number) => void;
}

const Categories = ({ category, delCategory }: Props) => {
  return (
    <> 
        <div className="container">
            <h1>Category</h1>
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