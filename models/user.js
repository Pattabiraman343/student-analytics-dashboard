import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
name: String,
email: String,
password: String,
role: {
type: String,
enum: ["teacher","student"]
}
},
{timestamps:true}
);
//model
export default mongoose.model("User", userSchema);