import express from "express";
import { handleLogin, handleSignUp } from "../../controllers/auth";
import catchAsync from "../../util/catchAsync";

const router = express.Router();

router.post("/sign-up",catchAsync(handleSignUp))
router.post("/sign-in",catchAsync(handleLogin))

export default router

