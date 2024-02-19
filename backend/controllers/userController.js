import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Pulbic

const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email and password');
    }
});

// @desc    Register user
// @route   POST /api/users
// @access  Pulbic

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    const userExists = User.findOne({ email });

    if(userExists) {
        res.status(401);
        throw new error('User already exist');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new error('Invalid user data');
    }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'logged out successfully' });
});

// @desc    Get user Profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(res.user._id);

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new error("User not found");
    }
});

// @desc    Update user Profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new error("User not found");
    }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserBYID = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete users');
});

// @desc    update users
// @route   UPDATE /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('update users');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserBYID,
    deleteUser,
    updateUser
}