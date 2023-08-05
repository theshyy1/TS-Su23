import { Category } from '../../interface'

interface Props {
    cate: Category;
    delCategory: (id: number) => void;
}

const CateItem = ({ cate, delCategory }: Props) => {
  return (
    <tr key={cate.id}>
        <td>{cate.id}</td>
        <td>{cate.name}</td>
        <td>
            <button className='btn btn-warning' onClick={delCategory.bind(this, cate.id)}>Del</button>
            <a href={`/category/update/${cate.id}`} className='btn btn-secondary'>Update</a>
        </td>
    </tr>
  )
}

export default CateItem