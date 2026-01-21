const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    //check for the token in the header
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // If no token, block access
    if(!token) {
        return res.status(401).json({
            message: "Not authorized, token missing"
        });
    }

    try {
        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user info to request
        req.user = decoded;


        //Continue to next middleware/controller
        next();
    } catch(error){
        return res.status(401).json({
            message: "Not authorized, token invalid"
        });
    }
};

module.exports = protect;