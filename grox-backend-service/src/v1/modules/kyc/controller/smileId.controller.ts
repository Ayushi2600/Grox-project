import { Request, Response } from "express";
import { smileIdService } from "../services/smileId.service";

const jobSignatureMap = new Map<
  string,
  { userId: string; signature: string }
>();
const signatureMap = new Map<string, string>();

class SmileIdController {
  /**
   * API to start a Biometric KYC job
   */
  async biometricKyc(req: Request, res: Response) {
    try {
      const { jobId, userId, selfieBase64, idCardBase64, idInfo } = req.body;

      if (!jobId || !userId || !selfieBase64 || !idCardBase64 || !idInfo) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      const response = await smileIdService.submitJob(
        userId,
        jobId,
        selfieBase64,
        idCardBase64,
        idInfo
      );

      jobSignatureMap.set(jobId, { userId, signature: "" });

      res.json({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Biometric KYC failed",
        error: err.message,
      });
    }
  }

  /**
   * Callback endpoint (Smile ID will send results here)
   */
  async callback(req: Request, res: Response) {
    try {
      const signature = req.headers["smile-signature"] as string;
      const timestamp = req.headers["smile-timestamp"] as string;

      if (!signature || !timestamp) {
        return res
          .status(400)
          .json({ success: false, message: "Missing headers" });
      }

      // Verify cryptographic signature
      const isValid = smileIdService.verifyCallback(timestamp, signature);
      if (!isValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid callback signature" });
      }

      const { job_id, user_id } = req.body;
      const existing = jobSignatureMap.get(job_id);

      // 1. Job not registered
      if (!existing) {
        return res
          .status(400)
          .json({ success: false, message: "Unknown jobId in callback" });
      }

      // 2. User mismatch
      if (existing.userId !== user_id) {
        return res.status(400).json({
          success: false,
          message: "Callback userId does not match original job’s userId",
        });
      }

      // 3. Signature reuse check
      if (
        signatureMap.has(signature) &&
        signatureMap.get(signature) !== job_id
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid signature — reused for another job",
        });
      }

      // 4. First valid callback
      if (!existing.signature) {
        existing.signature = signature;
        jobSignatureMap.set(job_id, existing);
        signatureMap.set(signature, job_id);
        return res.json({ success: true, message: "Callback received" });
      }

      // 5. Subsequent callbacks for same job → same response
      return res.json({ success: true, message: "Callback already processed" });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  /**
   * Manually check job status
   */
  async jobStatus(req: Request, res: Response) {
    try {
      const { userId, jobId } = req.query;
      const result = await smileIdService.getJobStatus(
        userId as string,
        jobId as string
      );
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  /**
   * Generate Web Token for frontend Smile ID SDK
   */
  async webToken(req: Request, res: Response) {
    try {
      const { userId, jobId } = req.body;

      if (!userId || !jobId) {
        return res
          .status(400)
          .json({ success: false, message: "userId and jobId are required" });
      }

      const token = await smileIdService.generateWebToken(userId, jobId);
      res.json({ success: true, data: token });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export const smileIdController = new SmileIdController();
