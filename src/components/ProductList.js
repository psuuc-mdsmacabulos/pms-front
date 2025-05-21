import { useContext } from 'react';
     import { ProductContext } from './ProductContext';
     import { Link } from 'react-router-dom';

     const ProductList = () => {
         const { products } = useContext(ProductContext);

         return (
             <div className="container py-4">
                 <h2 className="mb-4">Products</h2>
                 <div className="row row-cols-1 row-cols-md-3 g-4">
                     {products.map(product => (
                         <div key={product.id} className="col">
                             <div className="card h-100">
                                 <img src={product.image_url} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                                 <div className="card-body">
                                     <h5 className="card-title">{product.name}</h5>
                                     <p className="card-text">${product.price}</p>
                                     <Link to={`/product/${product.id}`} className="btn btn-primary">
                                         View Details
                                     </Link>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         );
     };

     export default ProductList;