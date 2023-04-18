import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const { sign, verify } = jwt;

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    tokens: [
        {
            token:{
                type: String,
                required: true, 
            }
        }
    ]
}, {
    timestamps: true
})
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = sign(
        { _id: user.id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User" , userSchema);

export default User