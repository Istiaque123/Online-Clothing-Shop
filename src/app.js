import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'; // Import dotenv for environment variables
import conn from './db/conn.js';
import userRoutes from './routes/userRoutes.js';



dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve 'output.css' from 'src' directory
app.use('/src', express.static(path.join(__dirname, '../src')));






// Define routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'shop.html'));
});

app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'about_us.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'product.html'));
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'contact_us.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'user.html'));
});
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cart.html'));
});
app.get('/logReg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'log_reg.html'));
});


app.get('/account', (req, res) => { // Protect this route
    res.sendFile(path.join(__dirname, '../public', 'userProfile.html'));
});
app.get('/checkout', (req, res) => { // Protect this route
    res.sendFile(path.join(__dirname, '../public', 'biling.html'));
});



// Use user routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
