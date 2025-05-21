import { useState, useEffect } from 'react';
     import { useParams } from 'react-router-dom';
     import axios from 'axios';

     const ProductDetail = () => {
         const { id } = useParams();
         const [product, setProduct] = useState(null);

         useEffect(() => {
             axios.get(`http://127.0.0.1:8000/api/products/${id}`)
                 .then(response => setProduct(response.data))
                 .catch(error => console.error('Error fetching product:', error));
         }, [id]);

         if (!product) return <div className="container py-4">Loading...</div>;

         return (
             <div className="container py-4">
                 <h2 className="mb-4">{product.name}</h2>
                 <div className="card">
                     <div className="row g-0">
                         <div className="col-md-4">
                             <img src={product.image_url} className="img-fluid rounded-start" alt={product.name} style={{ maxHeight: '300px', objectFit: 'cover' }} />
                         </div>
                         <div className="col-md-8">
                             <div className="card-body">
                                 <h5 className="card-title">{product.name}</h5>
                                 <p className="card-text">{product.description}</p>
                                 <p className="card-text"><strong>Price:</strong> ₱{product.price}</p>
                                 <p className="card-text"><strong>Stock:</strong> {product.stock_quantity}</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         );
     };

     export default ProductDetail;