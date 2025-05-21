import { useContext } from 'react';
import { ProductContext } from './ProductContext';

const WishlistPage = () => {
  const { wishlist } = useContext(ProductContext);

  return (
    <div className="container py-4">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {wishlist.map(product => (
            <div key={product.id} className="col">
              <div className="card h-100">
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
