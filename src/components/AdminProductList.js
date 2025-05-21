import { useContext } from 'react';
import { ProductContext } from './ProductContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminProductList = () => {
  const { products, error, userRole } = useContext(ProductContext);
  const navigate = useNavigate();

  // Redirect non-admins
  if (userRole !== 'admin') {
    navigate('/productlist'); // Redirect to home or login page
    return null;
  }

  return (
    <div className="container py-4">
      <h2>Manage Products</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Link to="/createproduct" className="btn btn-success">➕ Add Product</Link>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <img src={product.image_url} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;