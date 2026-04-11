import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContainer, AuthCard, InputGroup, SubmitBtn, SwitchText, ErrorMsg } from './Login';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    
    // OTP states
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [otp, setOtp] = useState('');
    
    const { signup, verifySignupOtp } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImg) {
            formData.append('profileImage', profileImg);
        }

        try {
            const data = await signup(formData);
            setMessage(data.message);
            setIsOtpStep(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await verifySignupOtp(email, otp);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
        }
    };

    return (
        <AuthContainer>
            <AuthCard as={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <h2>Create Account</h2>
                <p>Start tracking your expenses effectively</p>
                {error && <ErrorMsg as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</ErrorMsg>}
                {message && <div style={{color:'green', marginBottom:'10px'}}>{message}</div>}
                
                <AnimatePresence mode="wait">
                    {!isOtpStep ? (
                        <motion.form key="signup-form" onSubmit={handleSubmit} encType="multipart/form-data" 
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                            <ProfileUpload>
                                <input
                                    type="file"
                                    id="profile-img"
                                    accept="image/*"
                                    onChange={(e) => setProfileImg(e.target.files[0])}
                                />
                                <label htmlFor="profile-img">
                                    {profileImg ? profileImg.name : "Choose Profile Picture"}
                                </label>
                            </ProfileUpload>
                            <InputGroup>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </InputGroup>
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
                            <SubmitBtn as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Sign Up</SubmitBtn>
                            <SwitchText>
                                Already have an account? <Link to="/login">Log in</Link>
                            </SwitchText>
                        </motion.form>
                    ) : (
                        <motion.form key="otp-form" onSubmit={handleVerifyOtp} 
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                            <p style={{fontSize:'0.9rem', color:'#555', marginBottom:'15px'}}>Check the terminal logic or ethereal email address for the OTP!</p>
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
                            <SubmitBtn as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" style={{ background: '#42ad00' }}>Verify OTP</SubmitBtn>
                        </motion.form>
                    )}
                </AnimatePresence>
            </AuthCard>
        </AuthContainer>
    );
};

const ProfileUpload = styled.div`
    margin-bottom: 1.5rem;
    
    input { display: none; }
    
    label {
        display: block;
        width: 100%;
        padding: 1rem;
        background: rgba(34, 34, 96, 0.05);
        border: 2px dashed rgba(34, 34, 96, 0.2);
        border-radius: 12px;
        color: #6c757d;
        cursor: pointer;
        transition: all 0.3s ease;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
            background: rgba(245, 102, 146, 0.05);
        }
    }
`;

export default Signup;
