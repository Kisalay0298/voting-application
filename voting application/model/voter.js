const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const qrCode = require('qrcode');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others', 'prefer not say'],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    aadharId: {
        type: String,
        required: true,
        unique: true
    },
    qrCode: {
        type: String,  // Stores base64 QR code string
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    hasVoted: {
        type: Boolean,
        default: false
    }
});

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();  // Always call next()
});

// Post-validate hook for QR Code generation
userSchema.post('validate', async function (user) {
    if (user.isNew || user.isModified('name') || user.isModified('gender') ||
        user.isModified('age') || user.isModified('aadharId') || user.isModified('address')) {
        try {
            const userData = {
                Name: user.name,
                Gender: user.gender,
                Age: user.age,
                Designation: user.role,
                Address: user.address,
                Aadhar: user.aadharId
            };

            // Generate QR Code as base64
            user.qrCode = await qrCode.toDataURL(JSON.stringify(userData));
        } catch (err) {
            throw new Error('Error generating QR Code');
        }
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const Voter = mongoose.model('Voter', userSchema);
module.exports = Voter;
