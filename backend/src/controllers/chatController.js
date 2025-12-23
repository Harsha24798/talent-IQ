import { chatClient } from "../lib/stream.js";

export async function chatController(req, res) {
    try {
        const token = chatClient.createToken(req.user.clerkUserId);

        res.status(200).json({
            token,
            userId: req.user.clerkUserId,
            userName: req.user.name,
            userImage: req.user.profileImage
        })
    } catch (error) {
        console.log("Error in getStreamToken controller", error.message)
        res.status(500).json({msg: 'Error generating Stream token', error: error.message});
    }
}