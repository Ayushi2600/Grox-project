// @v1/modules/kyc/controllers/smileId.controller.ts
import { Request, Response } from "express";
import { SmileIdService } from "../services/smileId.service";

export class SmileIdController {
  private smileIdService: SmileIdService;

  constructor() {
    this.smileIdService = new SmileIdService();
  }

  submitBiometricKyc = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const finalUserId = body.userId || this.smileIdService.generateUserId();
      const finalJobId = body.jobId || this.smileIdService.generateJobId();

      const kycRequest = {
        ...body,
        userId: finalUserId,
        jobId: finalJobId,
        country: body.country?.toUpperCase(),
      };

      const result = await this.smileIdService.submitBiometricKyc(kycRequest);

      res.status(200).json({
        success: true,
        message: "Biometric KYC job submitted successfully",
        ...result,
        jobId: finalJobId,
        userId: finalUserId,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ success: false, message: error.message, error: error.stack });
    }
  };

  handleCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      const callbackResult = await this.smileIdService.processCallback(
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Callback processed successfully",
        data: callbackResult,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Callback received but processing failed",
        error: error.message,
      });
    }
  };

  getJobStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        res.status(400).json({ success: false, message: "Job ID is required" });
        return;
      }

      const jobStatus = await this.smileIdService.getJobStatus(jobId);
      res.status(200).json(jobStatus);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  healthCheck = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      message: "Smile ID KYC service is healthy",
      timestamp: new Date().toISOString(),
      config: {
        partnerId: process.env.SMILE_PARTNER_ID,
        server: process.env.SMILE_SERVER,
        callbackUrl: process.env.SMILE_DEFAULT_CALLBACK,
      },
    });
  };

  generateTestIds = async (req: Request, res: Response): Promise<void> => {
    const userId = this.smileIdService.generateUserId();
    const jobId = this.smileIdService.generateJobId();
    res.status(200).json({
      success: true,
      data: { userId, jobId, timestamp: new Date().toISOString() },
    });
  };

  getSupportedIdTypes = async (req: Request, res: Response): Promise<void> => {
    const supportedIdTypes = {
      NG: ["NIN", "BVN", "PASSPORT", "DRIVERS_LICENSE"],
      KE: ["NATIONAL_ID", "PASSPORT", "ALIEN_ID"],
      GH: ["GHANA_CARD", "PASSPORT", "DRIVERS_LICENSE"],
      UG: ["NATIONAL_ID", "PASSPORT"],
      ZA: ["NATIONAL_ID", "PASSPORT", "DRIVERS_LICENSE"],
    };
    const countryCode = req.params.country?.toUpperCase();
    const idTypes =
      supportedIdTypes[countryCode as keyof typeof supportedIdTypes] || [];
    res.status(200).json({
      success: true,
      data: { country: countryCode, supportedIdTypes: idTypes },
    });
  };
}
