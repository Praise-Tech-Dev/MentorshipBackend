import AuthModel from "../models/authSchema.js";
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

const EditProfile = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        
        if(id) {
            const {name, email, bio, skills, goal} = req.body;

            const user = await AuthModel.findById(id);
            if(!user){
                return res.status(404).json({message: "user not found"});
            }
            user.name = name || user.name;
            user.email = email || user.email;   
            user.bio = bio || user.bio;
            user.skills = skills || user.skills;
            user.goal = goal || user.goal;

            await user.save();

            return res.status(200).json({message: "Profile updated successfully", 
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    skills: user.skills,
                    goal: user.goal
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export { getUserData, EditProfile };