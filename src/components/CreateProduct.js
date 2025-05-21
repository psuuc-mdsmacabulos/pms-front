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
    const processedFormData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
    };

    try {
      const success = await createProduct(processedFormData);
      if (success) {
        navigate('/productlist');
      } else {
        throw new Error(error || 'Failed to create product.');
      }
    } catch (err) {
      console.error('Create product error:', err);
      if (err.response?.data?.error) {
        alert(`Failed to create product: ${JSON.stringify(err.response.data.error)}`);
      } else {
        alert(`Failed to create product: ${err.message}`);
      }
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
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} step="0.01" required />
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