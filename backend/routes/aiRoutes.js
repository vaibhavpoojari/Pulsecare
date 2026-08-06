import express from "express";
import { queryAiHealthAssistant } from "../controllers/aiController.js";
import { validateInput } from "../middleware/validation.js";

const router = express.Router();

router.use(validateInput);
router.route("/query").post(queryAiHealthAssistant);

export default router;
