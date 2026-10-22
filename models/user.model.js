import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(definition: {
    name: {
        type:String,
        required:[ true, 'Username is required'],
        trim: true,
        minLength: [2, 'Username must be atleast 2 characters long'],
        maxLength: [30, 'Username must be at most 30 characters long'],
    },
    email: {
        type:String,
        required:[ true, 'Email is required'],
        trim: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type:String,
        required:[ true, 'Password is required'],
        trim: true,
        minLength: [6, 'Password must be atleast 6 characters long'],
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    updatedAt: {
        type:Date,
        default: Date.now
    }
}, { timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User;