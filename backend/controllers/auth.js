const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            if (userExists.isVerified) {
                return res.status(400).json({ message: 'User already exists' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let profileImage = "";
        if (req.file) {
            profileImage = `/uploads/${req.file.filename}`;
        }

        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

        let user;
        if (userExists && !userExists.isVerified) {
            // Update the unverified user with new details and generic OTP
            userExists.username = username;
            userExists.password = hashedPassword;
            userExists.profileImage = profileImage;
            userExists.otp = otp;
            userExists.otpExpiresAt = otpExpiresAt;
            user = await userExists.save();
        } else {
            user = await User.create({
                username,
                email,
                password: hashedPassword,
                profileImage,
                otp,
                otpExpiresAt,
                isVerified: false
            });
        }

        if (user) {
            // Send OTP email
            if (transporter) {
                const info = await transporter.sendMail({
                    from: '"Money Manager Security" <security@moneymanager.local>',
                    to: email,
                    subject: "Your Registration OTP",
                    text: `Your OTP for Registration is: ${otp}. It will expire in 10 minutes.`,
                    html: `<b>Your OTP for Registration is: ${otp}</b><br/>It will expire in 10 minutes.`,
                });
                console.log("Registration OTP Email Sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            res.status(201).json({
                message: 'OTP Sent successfully. Please verify your email.',
                email: user.email 
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Account not verified. Please register again to get an OTP.' });
            }

            const otp = generateOTP();
            user.otp = otp;
            user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
            await user.save();

            if (transporter) {
                const info = await transporter.sendMail({
                    from: '"Money Manager Security" <security@moneymanager.local>',
                    to: email,
                    subject: "Your Login OTP",
                    text: `Your OTP for Login is: ${otp}. It will expire in 10 minutes.`,
                    html: `<b>Your OTP for Login is: ${otp}</b><br/>It will expire in 10 minutes.`,
                });
                console.log("Login OTP Email Sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            res.json({
                message: 'OTP Sent successfully to email!',
                email: user.email
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { username, email, mobileNumber } = req.body;
        
        // Find existing user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is being updated to an existing email
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        // Update fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
        
        // Handle image upload if a new file exists
        if (req.file) {
            user.profileImage = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            mobileNumber: updatedUser.mobileNumber,
            profileImage: updatedUser.profileImage,
            token: generateToken(updatedUser._id), // Optional: Refresh token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};

exports.verifySignup = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
        
        if (user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error verifying OTP' });
    }
};

exports.verifyLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
        
        if (user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error verifying OTP' });
    }
};
