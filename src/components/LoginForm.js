import { useState, useContext } from 'react';
     import { ProductContext } from './ProductContext';

     const LoginForm = () => {
         const { login } = useContext(ProductContext);
         const [email, setEmail] = useState('');
         const [password, setPassword] = useState('');
         const [error, setError] = useState('');

         const handleSubmit = async (e) => {
             e.preventDefault();
             const success = await login(email, password);
             if (!success) {
                 setError('Invalid email or password');
             }
         };

         return (
             <div className="container py-4">
                 <h2 className="mb-4">Login</h2>
                 <div className="card p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
                     {error && <div className="alert alert-danger" role="alert">{error}</div>}
                     <form onSubmit={handleSubmit}>
                         <div className="mb-3">
                             <label htmlFor="email" className="form-label">Email</label>
                             <input
                                 type="email"
                                 className="form-control"
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                             />
                         </div>
                         <div className="mb-3">
                             <label htmlFor="password" className="form-label">Password</label>
                             <input
                                 type="password"
                                 className="form-control"
                                 id="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                             />
                         </div>
                         <button type="submit" className="btn btn-primary w-100">Login</button>
                     </form>
                 </div>
             </div>
         );
     };

     export default LoginForm;