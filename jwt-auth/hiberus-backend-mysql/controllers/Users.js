import Users from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const MAX_TIME_TOKEN_MIL_SEC = 24 * 60 * 60 * 1000;

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) {
        return res.status(400).json({msg: "Password and Confirm Password do not match"});
    }
    const emailDB = await Users.findAll({
        where:{
            email: email
        }
    });
    if(emailDB.length > 0) {
        return res.status(400).json({msg: "This email already exist"});
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) {
            return res.status(400).json({msg: "Wrong Password"});
        }
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                email: email
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: MAX_TIME_TOKEN_MIL_SEC
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email doesn't exist"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(user.length < 0) {
        return res.sendStatus(204);
    }
    const email = user[0].email;
    await Users.update({refresh_token: null},{
        where:{
            email: email
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}