import express from 'express';
import { login, me, register } from '../controllers/authController.js';
import { forgotPassword, resetPassword, verifyResetToken } from '../controllers/passwordResetController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { validateAuth, validateInput } from '../middleware/validation.js';

const router = express.Router();

router.use(validateInput);

router.route("/register").post(validateAuth.register, register);
router.route("/login").post(validateAuth.login, login);
router.route("/me").get(isAuthenticated, me);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/verify-reset-token/:token").get(verifyResetToken);

export default router
