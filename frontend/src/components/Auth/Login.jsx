import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [isOtpStep, setIsOtpStep] = useState(false);
    const [otp, setOtp] = useState('');

    const { login, verifyLoginOtp } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const data = await login(email, password);
            setMessage(data.message);
            setIsOtpStep(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await verifyLoginOtp(email, otp);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
        }
    };

    return (
        <AuthContainer>
            <AuthCard as={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <h2>Welcome Back</h2>
                <p>Sign in to continue to your Money Manager</p>
                {error && <ErrorMsg as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</ErrorMsg>}
                {message && <div style={{color:'green', marginBottom:'10px'}}>{message}</div>}
                
                <AnimatePresence mode="wait">
                    {!isOtpStep ? (
                        <motion.form key="login-form" onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                            <InputGroup>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <SubmitBtn type="submit" as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Log In
                            </SubmitBtn>
                            <SwitchText>
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </SwitchText>
                        </motion.form>
                    ) : (
                        <motion.form key="otp-form" onSubmit={handleVerifyOtp}
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                            <p style={{fontSize:'0.9rem', color:'#555', marginBottom:'15px'}}>An OTP code has been dispatched. Enter it below:</p>
                            <InputGroup>
                                <input
                                    type="text"
                                    placeholder="6-Digit OTP"
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <SubmitBtn type="submit" as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: '#42ad00' }}>
                                Verify OTP
                            </SubmitBtn>
                        </motion.form>
                    )}
                </AnimatePresence>
            </AuthCard>
        </AuthContainer>
    );
};

export const AuthContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(239, 237, 250, 1) 0%, rgba(206, 196, 255, 1) 100%);
`;

export const AuthCard = styled.div`
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.1);
    padding: 3rem 2.5rem;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    text-align: center;

    h2 {
        color: #222260;
        margin-bottom: 0.5rem;
        font-size: 2rem;
    }
    p {
        color: #6c757d;
        margin-bottom: 2rem;
        font-size: 0.95rem;
    }
`;

export const InputGroup = styled.div`
    margin-bottom: 1.5rem;

    input {
        width: 100%;
        padding: 1rem 1.25rem;
        border-radius: 12px;
        border: 1px solid rgba(34, 34, 96, 0.1);
        background: rgba(255, 255, 255, 0.6);
        outline: none;
        color: #222260;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:focus {
            border-color: var(--color-accent);
            box-shadow: 0 0 0 2px rgba(245, 102, 146, 0.2);
            background: #fff;
        }
    }
`;

export const SubmitBtn = styled.button`
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    border: none;
    background: var(--color-accent);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0px 4px 15px rgba(245, 102, 146, 0.3);
`;

export const SwitchText = styled.p`
    margin-top: 1.5rem !important;
    margin-bottom: 0 !important;
    font-size: 0.9rem !important;

    a {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const ErrorMsg = styled.div`
    background: rgba(255, 77, 79, 0.1);
    color: #ff4d4f;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 77, 79, 0.2);
`;

export default Login;
