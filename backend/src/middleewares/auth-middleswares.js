import jwt from 'jsonwebtoken';





export const authMiddleware = (req, res, next) => {
    const autHeader = req.headers.authorization;


    if (!autHeader) {
        res.status(401).send('Missing authorization header');
        return;
    }
    const tokenParts = autHeader.split(' ');
    const token = tokenParts[1];


    if (!token) {
        res.status(401).send('Missing token');

        return;
    } try {
        const jwtsecret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtsecret);

        req.user = decoded;
        next();
        console.log("Decoded token:", decoded);


    } catch {
        res.status(401).json({message:'Invalid or expired token'})
    }
}

