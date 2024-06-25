import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    imgSrc: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    popularity: { type: Number, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true },
    dress_sizes: [String],
    dress_colors: [String],
    reviews: { type: Object, default: {} }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
