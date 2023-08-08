import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid bg-slate-500">
          <a className="navbar-brand" href="/">TypeScript</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="admin/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="admin/category">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="admin/users">Users</Link>
              </li>
            </ul>
            <Link to="/login" className='btn btn-primary'>Login</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Home