import { useState, useContext } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const { createProduct, error } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    stock_quantity: '',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await createProduct(formData);
    if (success) {
      navigate('/admin/products');
    } else {
      alert(error || 'Failed to create product.');
    }
  };

  return (
    <div className="container py-4">
      <h2>Add New Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="image_url" className="form-control" value={formData.image_url} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          <input type="number" name="stock_quantity" className="form-control" value={formData.stock_quantity} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;