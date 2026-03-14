import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async(data)=>{

const hash = await bcrypt.hash(data.password,10);

const user = await User.create({
name:data.name,
email:data.email,
password:hash,
role:data.role
});

return user;
};

export const loginService = async(email,password)=>{

const user = await User.findOne({email});

if(!user) throw new Error("User not found");

const match = await bcrypt.compare(password,user.password);

if(!match) throw new Error("Invalid password");

const token = jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

return {token,user};

};