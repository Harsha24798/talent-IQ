import { requireAuth } from '@clerk/express'
import User from '../models/User.js';

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({message: 'Unauthorized - Invalid Token'});

            const user = await User.findOne({clerkUserId: clerkId});
            if(!user) return res.status(404).json({message: 'User not found'});

            req.user = user;
            console.log(user)
            next();
        } catch (error) {
            console.log("Error in ProtectRoute middelware", error);
            return res.status(500).json({message: 'Server Error in ProtectRoute Middleware'});
        }
    }
]