const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[ 1 ];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token is not valid!' });
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Client' || req.user.userType === 'Vendor' || req.user.userType === 'Admin' || req.user.userType === 'Driver') {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized!' });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized!' });
        }
    });
};

const verifyTokenAndDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Driver' || req.user.userType === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized!' });
        }
    });
};

const verifyTokenAndVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Vendor' || req.user.userType === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized!' });
        }
    });
};
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndDriver, verifyTokenAndVendor };