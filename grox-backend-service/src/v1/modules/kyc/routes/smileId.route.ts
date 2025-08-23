import { Router } from "express";
import { smileIdController } from "../controller/smileId.controller";

const router = Router();

router.post("/biometric-kyc", (req, res) => smileIdController.biometricKyc(req, res));
router.post("/callback", (req, res) => smileIdController.callback(req, res));
router.get("/job-status", (req, res) => smileIdController.jobStatus(req, res));
router.post("/web-token", (req, res) => smileIdController.webToken(req, res));

export default router;
