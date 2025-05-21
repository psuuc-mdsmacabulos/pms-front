import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Failed to fetch products.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        fetchProducts();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            setError(null);
            return true;
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
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
            setError(null);
            return true;
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setWishlist([]);
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
            setProducts(prev => [...prev, response.data]);
            setError(null);
            return true;
        } catch (error) {
            console.error('Failed to create product:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Failed to create product.');
            return false;
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            wishlist,
            isLoggedIn,
            error,
            login,
            register,
            logout,
            addToWishlist,
            createProduct,
            fetchProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};