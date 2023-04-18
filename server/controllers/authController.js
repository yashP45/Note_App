import User from "../Models/userModel.js";


export const signUp = async (req , res  , next) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        const token = await newUser.generateAuthToken();
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    
    } catch (err) {
        if (newUser.password.length <8) {
            res.status(500).send({
                message: "Password should be atleat 8 char"
            })
        } else if (e.keyPattern.username === 1) {
            res.status(500).send({ message: "Username already taken!" });
        } else {
            res.status(500).send({ message: "Something went wrong" });
        }
    
    }
}
export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username }).select('+password');
        if (!username || !password) {
            res.status(500).send({
                message: "Username or password is required"
            })
        }
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(500).send({
                message: "username or password is incorrect"
            })
        }
        const token = await user.generateAuthToken();
        res.status(200).json({
            status: 'success',
            token,
            user
        })
    }catch(e) {
        res.status(500).send({ message: "Unable to login" });
    }
}

export const logout = async (req, res , next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send({ message: "Logged Out" });
    } catch (e) {
        res.status(500).send(e);
    }
}


  

