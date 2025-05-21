import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // New: Store user role
    const [error, setError] = useState(null); // New: Store API errors

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Optionally fetch user role from backend
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setUserRole(response.data.role)) // Assumes backend returns user role
                .catch(() => setUserRole(null));
        }
        fetchProducts();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            setUserRole(response.data.user.role); // Assumes backend returns user role
            setError(null);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
            return false;
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                password_confirmation,
            });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            setUserRole(response.data.user.role); // Assumes backend returns user role
            setError(null);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserRole(null);
        setWishlist([]); // Optional: Clear wishlist on logout
        setError(null);
    };

    const addToWishlist = (product) => {
        const exists = wishlist.find(p => p.id === product.id);
        if (!exists) {
            setWishlist(prev => [...prev, product]);
        }
    };

    const createProduct = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/products/store', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(prev => [...prev, response.data]); // Append new product
            setError(null);
            return true;
        } catch (error) {
            console.error('Failed to create product:', error);
            setError('Failed to create product.');
            return false;
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            wishlist,
            isLoggedIn,
            userRole,
            error,
            login,
            register,
            logout,
            addToWishlist,
            createProduct,
            fetchProducts // Expose fetchProducts for manual refresh if needed
        }}>
            {children}
        </ProductContext.Provider>
    );
};