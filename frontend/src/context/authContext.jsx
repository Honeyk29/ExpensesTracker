import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
        // Token relies on verifyLoginOtp now, ignore localstorage here
        return response.data;
    };

    const signup = async (formData) => {
        const response = await axios.post('http://localhost:5000/api/v1/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // Token relies on verifySignupOtp now
        return response.data;
    };

    const verifySignupOtp = async (email, otp) => {
        const response = await axios.post('http://localhost:5000/api/v1/verify-signup', { email, otp });
        if (response.data && response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    };

    const verifyLoginOtp = async (email, otp) => {
        const response = await axios.post('http://localhost:5000/api/v1/verify-login', { email, otp });
        if (response.data && response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    };

    const updateUser = async (formData) => {
        const response = await axios.put('http://localhost:5000/api/v1/update-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, verifySignupOtp, verifyLoginOtp, updateUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
