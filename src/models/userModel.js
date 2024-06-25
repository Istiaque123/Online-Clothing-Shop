// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
    ,
    district: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
    ,
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
});




const User = mongoose.model('User', userSchema);



export default User;
