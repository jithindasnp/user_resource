import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password:{type:String,required:true},
  age: { type: Number, required: true, min: 0 },
});

const User = mongoose.model("user", userSchema);

export default User;
