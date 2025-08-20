// @v1/modules/kyc/controllers/smileId.controller.ts
import { Request, Response } from 'express';
import { SmileIdService } from '../services/smileId.service';

export class SmileIdController {
  private smileIdService: SmileIdService;

  constructor() {
    this.smileIdService = new SmileIdService();
  }

  /**
   * Submit Biometric KYC job
   * POST /api/v1/kyc/biometric-kyc
   */
  submitBiometricKyc = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        userId,
        jobId,
        firstName,
        lastName,
        country,
        idType,
        idNumber,
        dateOfBirth,
        selfieImage,
        livenessImages,
        isBase64 = true,
        returnJobStatus = false,
        returnHistory = false,
        returnImageLinks = false
      } = req.body;

      // Generate IDs if not provided
      const finalUserId = userId || this.smileIdService.generateUserId();
      const finalJobId = jobId || this.smileIdService.generateJobId();

      const kycRequest = {
        userId: finalUserId,
        jobId: finalJobId,
        firstName,
        lastName,
        country: country.toUpperCase(), // Ensure country code is uppercase
        idType,
        idNumber,
        dateOfBirth,
        selfieImage,
        livenessImages,
        isBase64,
        returnJobStatus,
        returnHistory,
        returnImageLinks
      };

      const result = await this.smileIdService.submitBiometricKyc(kycRequest);

      res.status(200).json({
        success: true,
        message: 'Biometric KYC job submitted successfully',
        data: result,
        jobId: finalJobId,
        userId: finalUserId
      });

    } catch (error: any) {
      console.error('Error submitting biometric KYC:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to submit biometric KYC job',
        error: error.stack
      });
    }
  };

  /**
   * Handle callback from Smile ID
   * POST /api/v1/kyc/callback
   */
  handleCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Received callback from Smile ID:', req.body);

      const callbackResult = await this.smileIdService.processCallback(req.body);

      // Send success response to Smile ID
      res.status(200).json({
        success: true,
        message: 'Callback processed successfully',
        data: callbackResult
      });

    } catch (error: any) {
      console.error('Error processing callback:', error);
      
      // Still send 200 to Smile ID to acknowledge receipt
      // but log the error for debugging
      res.status(200).json({
        success: false,
        message: 'Callback received but processing failed',
        error: error.message
      });
    }
  };

  /**
   * Get job status
   * GET /api/v1/kyc/job-status/:smileJobId
   */
  getJobStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { smileJobId } = req.params;

      if (!smileJobId) {
        res.status(400).json({
          success: false,
          message: 'Smile Job ID is required'
        });
        return;
      }

      const jobStatus = await this.smileIdService.getJobStatus(smileJobId);

      res.status(200).json({
        success: true,
        data: jobStatus
      });

    } catch (error: any) {
      console.error('Error getting job status:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to get job status'
      });
    }
  };

  /**
   * Health check endpoint
   * GET /api/v1/kyc/health
   */
  healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({
        success: true,
        message: 'Smile ID KYC service is healthy',
        timestamp: new Date().toISOString(),
        config: {
          partnerId: process.env.SMILE_PARTNER_ID,
          server: process.env.SMILE_SERVER === '0' ? 'sandbox' : 'production',
          callbackUrl: process.env.SMILE_DEFAULT_CALLBACK
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Service health check failed',
        error: error.message
      });
    }
  };

  /**
   * Generate test IDs for development
   * GET /api/v1/kyc/generate-ids
   */
  generateTestIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = this.smileIdService.generateUserId();
      const jobId = this.smileIdService.generateJobId();

      res.status(200).json({
        success: true,
        data: {
          userId,
          jobId,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to generate test IDs',
        error: error.message
      });
    }
  };

  /**
   * Get supported ID types for a country
   * GET /api/v1/kyc/supported-id-types/:country
   */
  getSupportedIdTypes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { country } = req.params;

      // This is a sample response - you should implement actual ID type lookup
      // based on Smile ID's supported ID types documentation
      const supportedIdTypes = {
        'NG': ['NIN', 'BVN', 'PASSPORT', 'DRIVERS_LICENSE'],
        'KE': ['NATIONAL_ID', 'PASSPORT', 'ALIEN_ID'],
        'GH': ['GHANA_CARD', 'PASSPORT', 'DRIVERS_LICENSE'],
        'UG': ['NATIONAL_ID', 'PASSPORT'],
        'ZA': ['NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE'],
        // Add more countries as needed
      };

      const countryCode = country.toUpperCase();
      const idTypes = supportedIdTypes[countryCode as keyof typeof supportedIdTypes] || [];

      res.status(200).json({
        success: true,
        data: {
          country: countryCode,
          supportedIdTypes: idTypes
        }
      });

    } catch (error: any) {
      console.error('Error getting supported ID types:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to get supported ID types'
      });
    }
  };
}