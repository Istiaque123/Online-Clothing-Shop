import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'shazamrocks4@gmail.com', // Your email
        pass: 'smkz wyki gcmc egiv'  // App password generated in Google Account or your regular password if "Allow less secure apps" is on
    }
});

router.post('/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            birthDate,
            mobile,
            gender,
            district,
            region,
            city,
            postalCode
        } = req.body;

        // Validate incoming data (add more validation as needed)
        if (!firstName || !lastName || !email || !password || !birthDate || !mobile || !gender || !district || !region || !city || !postalCode) {
            return res.status(400).json({
                message: `Please provide all required fields.... Something missing ${firstName} fn: ${lastName} ln:${email} p:${password} bd:${birthDate}  phn:${mobile}  g:${gender}  d:${district}  r:${region}  c:${city}  pc:${postalCode}`
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: 'User already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthDate,
            mobile,
            gender,
            district,
            region,
            city,
            postalCode,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: 'Internal Server Error. Please try again later.'
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate incoming data
        if (!email || !password) {
            console.log(email, password);
            return res.status(400).json({
                message: 'Please provide both email and password.'
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(402).json({
                message: 'Invalid user'
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                message: 'Wrong password'
            });
        }

        // Generate JWT (if applicable)

        res.json({
            message: 'Login successful',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                mobile: user.mobile,
                district: user.district,
                region: user.region,
                city: user.city,
                postalCode: user.postalCode
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            message: 'Internal Server Error. Please try again later. .. :('
        });
    }
});

// Route to get user profile data
router.get('/profile', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            mobile: user.mobile,
            district: user.district,
            region: user.region,
            city: user.city,
            postalCode: user.postalCode
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Update user route
router.put('/update', async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        password,
        newpassword,
        birthDate,
        mobile,
        postalCode,
        district,
        region,
        city
    } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Update user fields
        user.firstName = firstName;
        user.lastName = lastName;
        user.birthDate = birthDate;
        user.mobile = mobile;
        user.postalCode = postalCode;
        user.district = district;
        user.region = region;
        user.city = city;

        // Check if a new password is provided and update it
        if (newpassword) {
            const hashedPassword = await bcrypt.hash(newpassword, 12);
            user.password = hashedPassword;
        }

        // Save the updated user to the database
        await user.save();

        res.json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Failed to update user'
        });
    }
});

// Order Routes

router.post('/orders', async (req, res) => {
    try {
        // Save the order to the database
        const order = new Order(req.body);
        await order.save();

        // Retrieve the user's email from the order data
        const userEmail = order.email;

        // Construct the email message
        let orderItemsHTML = '';
        let subtotal = 0;

        order.products.forEach(product => {
            const productSubtotal = product.price * product.quantity;
            subtotal += productSubtotal;
            orderItemsHTML += `
                <div>
                    <p>${product.title} -> Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Subtotal: $${productSubtotal.toFixed(2)}</p>
                </div>
                <br/>
            `;
        });

        const mailOptions = {
            from: 'your_email@gmail.com', // Replace with your email
            to: userEmail,
            subject: 'Order Confirmation',
            html: `
                <p>Thank you for your purchase!</p>
                <p>Order ID: ${order.orderId}</p>
                <p>Delivery Address: ${order.region}, ${order.state}, ${order.streetAddress} - ${order.zipCode}</p>
                <p>Total Amount: $${subtotal.toFixed(2)}</p>
                <p>Products:</p>
                ${orderItemsHTML}
                <p>Finel Price: $${order.total.toFixed(2)}
                <p>We appreciate your business. If you have any questions, feel free to contact us.</p>
            `
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(202).json({ message: 'Order processed and email sent', order });
        });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(400).json({
            error: error.message
        });
    }
});
// Route to get all products
router.get('/productsAll', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



// Feedback form route
router.post('/send-feedback', (req, res) => {
    const { firstname, fEmail, subject } = req.body;

    // Setup email data
    const mailOptions = {
        from: fEmail,
        to: 'your-recipient-email@example.com', // Replace with your recipient email
        subject: `Feedback from ${firstname}`,
        text: subject
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});


export default router;
