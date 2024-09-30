const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Address = require('../models/Address');

// POST /api/users - Create a user and their address
router.post('/', async (req, res) => {
    const { name, street, city, state, zipCode } = req.body;

    try {
        // Create a new user
        const user = new User({ name });
        await user.save();

        // Create a new address linked to the user
        const address = new Address({
            street,
            city,
            state,
            zipCode,
            user: user._id
        });
        await address.save();

        // Add the address to the user's address array
        user.addresses.push(address._id);
        await user.save();

        res.status(201).json({
            message: 'User and address saved successfully',
            user,
            address
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
