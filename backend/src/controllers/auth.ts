import { Request, Response } from "express";
import { User } from "../schema/User";
import sendResponse from "../util/sendResponse";
import { EHttpMessages, EHttpStrictCode } from "../constants/application";
import bcrypt from "bcryptjs";
import { generateTokens } from "../services/auth";

async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (!userFound) {
    return sendResponse(res, EHttpMessages.USER_NOT_FOUND, EHttpStrictCode.NOT_FOUND)
  }

  const isPasswordSame = await bcrypt.compare(password, userFound.password as string)

  if (!isPasswordSame) {
    return sendResponse(res, EHttpMessages.WRONG_PASSWORD, EHttpStrictCode.BAD_REQUEST)
  }

  const tokens = generateTokens(userFound._id.toString());

  await User.findOneAndUpdate({ _id: userFound._id }, {
    refreshToken: tokens.refreshToken
  });
  sendResponse(res, EHttpMessages.OK, { tokens }, EHttpStrictCode.OK);

}

async function handleSignUp(req:Request,res:Response) {
  const {email,name,password}= req.body;

  const foundUser = await User.findOne({email});
  if(foundUser){
    return sendResponse(res,"User already signed up, please login",null,EHttpStrictCode.BAD_REQUEST);
  }
  const hashedPass = await bcrypt.hash(password,10);


  const createdUser = await User.create({email,name,password:hashedPass});
  const tokens = generateTokens(createdUser._id.toString());

  sendResponse(res,EHttpMessages.CREATED,{user:createdUser,tokens})
}




export {handleLogin,handleSignUp}