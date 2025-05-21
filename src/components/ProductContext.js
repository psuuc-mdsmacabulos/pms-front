import { createContext, useState, useEffect } from 'react';
  import axios from 'axios';

  export const ProductContext = createContext();

  export const ProductProvider = ({ children }) => {
      const [products, setProducts] = useState([]);
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
          const token = localStorage.getItem('token');
          setIsLoggedIn(!!token);

          axios.get('http://127.0.0.1:8000/api/products')
              .then(response => setProducts(response.data))
              .catch(error => console.error('Error fetching products:', error));
      }, []);

      const login = async (email, password) => {
          try {
              const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
              localStorage.setItem('token', response.data.token);
              setIsLoggedIn(true);
              return true;
          } catch (error) {
              console.error('Login failed:', error);
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
              return true;
          } catch (error) {
              console.error('Registration failed:', error);
              return false;
          }
      };

      return (
          <ProductContext.Provider value={{ products, isLoggedIn, login, register }}>
              {children}
          </ProductContext.Provider>
      );
  };