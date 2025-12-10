import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Spara hela payload som ett objekt
        req.user = decoded;

        console.log("Decoded token:", decoded);
        next();
    } catch (err) {
        console.log('JWT verify failed:', err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
