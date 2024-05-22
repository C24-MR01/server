const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

require('dotenv').config({ path: '.env' });

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userRepository.findByEmail(decoded.email);
        next();
    } catch (error) {
        res.status(401).json({ message: error.name });
    }
};

module.exports = { authMiddleware };
