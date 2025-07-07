import AuthModel from "../models/authSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// User Registration controller
const register = async (req, res) => {
    const salt = 10;
    try {
        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are reuired"});
        }
        // Check if user already exists
        const existingUser = await AuthModel.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new AuthModel({
            name,
            email,
            password: hashedPassword,
            role
        }); 
        // Save the user to the database
        await user.save();

        //generate token 
        const token = jwt.sign ({id:user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        })
        return res.status(201).json({
            message: "User registered successfully", user: {id: user._id, name, email, role}});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// User Login controller
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await AuthModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        })
        return res.status(200).json({
            message: "User logged in successfully",
            user: {id: user._id, name: user.name, email: user.email, role: user.role, bio: user.bio, skills: user.skills, goal: user.goal}
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});

    }
}

//user logout controller
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.json({message: "Internal server error"});
        console.log(error);
        
    }
}


//users data
const getUserData = async(req, res) => {
    try {
        const {id} =req.params;

        const userData = await AuthModel.findById(id).select("-password");
        if(!userData){
            return res.status(404).json({message: "user not found"});
        }
        return res.status(200).json({userData});
    } catch (error) {
       console.log(error);
        return res.status(500).json({message: "Internal server error"}); 
    }
}
export{register, login, logout, getUserData};