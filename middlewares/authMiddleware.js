import JWT from 'jsonwebtoken'
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req,res,next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    }
    catch(error)
    {
        console.log(error);
    }    
};

// //admin access
// export const isAdmin = async(req,res,next) => {
//     try{
//         const user = await userModel.findById(req.user._id);
//         if(user.role !== 1){
//             return res.status(401).send({
//                 success:false,
//                 message:"UnAuthorized Access"
//             });
//         }else{
//             next();
//         }
//     }
//     catch(error){
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             error,
//             message: "Error in admin middleware",
//         });
//     }
// };

// Admin access middleware
export const isAdmin = async (req, res, next) => {
    try {
        // Ensure proper user authentication and retrieval
        if (!req.user || !req.user._id) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access: User not authenticated"
            });
        }

        // Retrieve user from the database
        const user = await userModel.findById(req.user._id);

        // Handle null user case
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access: User not found"
            });
        }

        // Check user role
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access: User does not have admin privileges"
            });
        }

        // If user is authenticated and has admin privileges, proceed
        next();
    } catch (error) {
        // Log any errors encountered 
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in admin middleware"
        });
    }
};
