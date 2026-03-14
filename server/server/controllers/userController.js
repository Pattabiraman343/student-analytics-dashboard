import {registerService,loginService} from "../services/userService.js";

export const register = async(req,res)=>{

try{

const user = await registerService(req.body);

res.json(user);

}catch(err){

res.status(500).json({message:err.message});

}

};

export const login = async(req,res)=>{

try{

const {email,password}=req.body;

const data = await loginService(email,password);

res.json(data);

}catch(err){

res.status(500).json({message:err.message});

}

};