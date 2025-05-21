import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import { ProductProvider } from './components/ProductContext';
     import ProductList from './components/ProductList';
     import ProductDetail from './components/ProductDetails';
     import LoginForm from './components/LoginForm';
     import RegisterForm from './components/RegisterForm';
     import WishlistPage from './components/WishlistPage';
     import AdminProductList from './components/AdminProductList';
     import CreateProductForm from './components/CreateProduct';


     function App() {
         return (
             <ProductProvider>
                 <Router>
                     <div className="bg-light min-vh-100">
                         <Routes>
                          <Route path="/" element={<LoginForm />} />
                          <Route path="/register" element={<RegisterForm />} />
                          <Route path="/productlist" element={<ProductList />} />
                          <Route path="/productdetails/:id" element={<ProductDetail />} />  
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/adminproducts" element={<AdminProductList />} />
                          <Route path="/createproduct" element={<CreateProductForm />} />
                         </Routes>
                     </div>
                 </Router>
             </ProductProvider>
         );
     }

     export default App;