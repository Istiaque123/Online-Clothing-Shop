import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
} );

const productSchema = new mongoose.Schema( {
    imgSrc: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    },
    dress_sizes: [ String ],
    dress_colors: [ String ],
    reviews: [ reviewSchema ]
} );


const Product = mongoose.model( 'Product', productSchema );

export default Product;