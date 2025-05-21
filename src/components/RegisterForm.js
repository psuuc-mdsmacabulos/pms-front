import { useState, useContext } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation

const RegisterForm = () => {
    const { register } = useContext(ProductContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }
        const success = await register(name, email, password, passwordConfirmation);
        if (success) {
            navigate('/');
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Register</h2>
            <div className="card p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="mt-3 text-center">
                    <p>Already have an account? <Link to="/" className="text-primary">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;