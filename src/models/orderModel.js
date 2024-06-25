import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';


const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

const orderSchema = new mongoose.Schema( {

    orderId: {
        type: String,
        default: () => nanoid(), // Generate unique 6-digit ID
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    region: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String
    },

    products: [ {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String
        },
        color: {
            type: String
        }

    } ],

    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

} );

const Order = mongoose.model( 'Order', orderSchema );

export default Order;