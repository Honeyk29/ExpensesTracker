import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useAuthContext } from '../../context/authContext';
import Button from '../Button/Button';

function Profile() {
    const { user, updateUser } = useAuthContext();
    
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        mobileNumber: user?.mobileNumber || '',
        profileImage: null,
    });
    const [imagePreview, setImagePreview] = useState(
        user?.profileImage ? `http://localhost:5000${user.profileImage}` : ''
    );
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInput = (name) => (e) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profileImage: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('mobileNumber', formData.mobileNumber);
            if (formData.profileImage) {
                data.append('profileImage', formData.profileImage);
            }

            await updateUser(data);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update profile' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProfileStyled>
            <InnerLayout>
                <h1>My Profile</h1>
                <div className="profile-container">
                    <form onSubmit={handleSubmit} className="profile-form">
                        
                        <div className="image-upload-con">
                            <div className="image-preview" onClick={() => document.getElementById('profileImage').click()}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile Preview" />
                                ) : (
                                    <div className="placeholder">
                                        <span>+ Upload</span>
                                    </div>
                                )}
                            </div>
                            <input 
                                type="file" 
                                id="profileImage" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                                hidden 
                            />
                            <p className="hint">Click image to change portrait</p>
                        </div>

                        {message.text && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="input-control">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                value={formData.username}
                                name={'username'} 
                                placeholder="Full Name"
                                onChange={handleInput('username')} 
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                name={'email'} 
                                placeholder="Email"
                                onChange={handleInput('email')} 
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label>Mobile Number</label>
                            <input 
                                type="tel" 
                                value={formData.mobileNumber}
                                name={'mobileNumber'} 
                                placeholder="Mobile Number"
                                onChange={handleInput('mobileNumber')} 
                            />
                        </div>

                        <div className="submit-btn">
                            <Button 
                                name={loading ? "Saving..." : "Save Changes"}
                                icon={null}
                                bPad={'.8rem 2rem'}
                                bRad={'30px'}
                                bg={'var(--color-green)'}
                                color={'#fff'}
                            />
                        </div>
                    </form>
                </div>
            </InnerLayout>
        </ProfileStyled>
    );
}

const ProfileStyled = styled.div`
    display: flex;
    overflow: auto;
    
    .profile-container {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }

    .profile-form {
        width: 100%;
        max-width: 500px;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0px 8px 32px rgba(0,0,0,0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .image-upload-con {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;

            .image-preview {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 4px solid #fff;
                box-shadow: 0px 8px 24px rgba(0,0,0,0.15);
                overflow: hidden;
                cursor: pointer;
                background: #fcf6f9;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 12px 32px rgba(0,0,0,0.25);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .placeholder {
                    color: rgba(34,34,96,.4);
                    font-weight: 600;
                    font-size: 1rem;
                }
            }

            .hint {
                font-size: 0.9rem;
                color: rgba(34,34,96,.5);
            }
        }

        .message {
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            font-weight: 600;
            &.success {
                background: rgba(66, 173, 0, 0.1);
                color: var(--color-green);
                border: 1px solid var(--color-green);
            }
            &.error {
                background: rgba(255, 0, 0, 0.1);
                color: red;
                border: 1px solid red;
            }
        }

        .input-control {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            label {
                font-size: 0.95rem;
                font-weight: 600;
                color: rgba(34,34,96,.8);
                margin-left: 0.5rem;
            }

            input {
                font-family: inherit;
                font-size: 1.1rem;
                outline: none;
                border: none;
                padding: 1rem 1.5rem;
                border-radius: 15px;
                background: rgba(255, 255, 255, 0.8);
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.5);
                color: rgba(34, 34, 96, 0.9);
                transition: all 0.3s ease;

                &:focus {
                    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(34, 34, 96, 0.2);
                }
                
                &::placeholder {
                    color: rgba(34, 34, 96, 0.4);
                }
            }
        }

        .submit-btn {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }
    }
`;

export default Profile;
