import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign({ userId: user?._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "90d" });
}

export default generateToken;