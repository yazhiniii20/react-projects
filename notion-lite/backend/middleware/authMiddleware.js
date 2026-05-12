//1. Receive token from frontend
//2. Verify token is valid
//3. Identify user
//4. Allow access to protected routes
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch(error){

        res.status(401).json({
            message: "Invalid token"
        });

    }
};

module.exports = authMiddleware;