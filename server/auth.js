import jwt from 'jsonwebtoken';
const {  verify } = jwt;
import User from "./Models/userModel.js";
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' });
const auth = async (req , res , next) => {
  try {
    const token = req.header("Authorization").replace("Bearer " ,"");

    const decoded = verify(token , process.env.JWT_SECRET)

    const user = await User.findOne({
        _id: decoded._id,
        "tokens.token":token
    })
    if(!user) {
        throw new Error()
    }

    req.token = token;
    req.user = user

  } catch (error) {
    res.status(401).send({Error: 'Unauthenticated'})
  }
}

export default auth