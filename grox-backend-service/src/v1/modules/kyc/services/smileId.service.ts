// @v1/modules/kyc/services/smileId.service.ts
import * as smileIdentityCore from 'smile-identity-core';

interface PartnerParams {
  job_id: string;
  user_id: string;
  job_type: number;
  optional_info?: string;
}

interface ImageDetail {
  image_type_id: number;
  image: string;
}

interface IdInfo {
  first_name: string;
  last_name: string;
  country: string;
  id_type: string;
  id_number: string;
  dob: string;
  entered: string;
}

interface JobOptions {
  return_job_status: boolean;
  return_history: boolean;
  return_image_links: boolean;
  signature: boolean;
}

interface BiometricKycRequest {
  userId: string;
  jobId: string;
  firstName: string;
  lastName: string;
  country: string;
  idType: string;
  idNumber: string;
  dateOfBirth: string;
  selfieImage: string;
  livenessImages?: string[];
  isBase64?: boolean;
  returnJobStatus?: boolean;
  returnHistory?: boolean;
  returnImageLinks?: boolean;
}

export class SmileIdService {
  private webApi: any;
  private partnerId: string;
  private apiKey: string;
  private sidServer: string;
  private defaultCallback: string;

  constructor() {
    this.partnerId = process.env.SMILE_PARTNER_ID || '';
    this.apiKey = process.env.SMILE_API_KEY || '';
    this.sidServer = process.env.SMILE_SERVER || '0';
    this.defaultCallback = process.env.SMILE_DEFAULT_CALLBACK || '';

    if (!this.partnerId || !this.apiKey || !this.defaultCallback) {
      throw new Error('Missing required Smile ID configuration in environment variables');
    }

    const WebApi = smileIdentityCore.WebApi;
    this.webApi = new WebApi(this.partnerId, this.defaultCallback, this.apiKey, this.sidServer);
  }

  /**
   * Submit a Biometric KYC job to Smile ID
   */
  async submitBiometricKyc(request: BiometricKycRequest): Promise<any> {
    try {
      // Validate required fields
      this.validateBiometricKycRequest(request);

      // Create partner parameters
      const partnerParams: PartnerParams = {
        job_id: request.jobId,
        user_id: request.userId,
        job_type: 1, // Biometric KYC job type
        optional_info: 'Biometric KYC verification'
      };

      // Create image details array
      const imageDetails: ImageDetail[] = [];
      
      // Add selfie image
      const selfieImageType = request.isBase64 ? 2 : 0; // 2 for base64, 0 for file path
      imageDetails.push({
        image_type_id: selfieImageType,
        image: request.selfieImage
      });

      // Add liveness images if provided
      if (request.livenessImages && request.livenessImages.length > 0) {
        const livenessImageType = request.isBase64 ? 6 : 4; // 6 for base64, 4 for file path
        request.livenessImages.forEach(livenessImage => {
          imageDetails.push({
            image_type_id: livenessImageType,
            image: livenessImage
          });
        });
      }

      // Create ID information
      const idInfo: IdInfo = {
        first_name: request.firstName,
        last_name: request.lastName,
        country: request.country,
        id_type: request.idType,
        id_number: request.idNumber,
        dob: request.dateOfBirth, // Format: yyyy-mm-dd
        entered: 'true' // Must be a string
      };

      // Set job options
      const options: JobOptions = {
        return_job_status: request.returnJobStatus ?? false,
        return_history: request.returnHistory ?? false,
        return_image_links: request.returnImageLinks ?? false,
        signature: true
      };

      // Submit the job
      const response = await this.webApi.submit_job(partnerParams, imageDetails, idInfo, options);
      
      return {
        success: true,
        data: response,
        message: 'Biometric KYC job submitted successfully'
      };

    } catch (error: any) {
      throw new Error(`Failed to submit Biometric KYC job: ${error.message}`);
    }
  }

  /**
   * Process callback from Smile ID
   */
  async processCallback(callbackData: any): Promise<any> {
    try {
      // Validate callback signature here if needed
      // You can implement signature verification based on your security requirements
      
      console.log('Received callback from Smile ID:', JSON.stringify(callbackData, null, 2));

      // Process the callback data based on your business logic
      const result = {
        smileJobId: callbackData.SmileJobID,
        resultCode: callbackData.ResultCode,
        resultText: callbackData.ResultText,
        confidenceValue: callbackData.ConfidenceValue,
        actions: callbackData.Actions,
        partnerParams: callbackData.PartnerParams,
        timestamp: callbackData.timestamp
      };

      // Here you can:
      // 1. Update user verification status in your database
      // 2. Send notifications to users
      // 3. Trigger other business processes
      
      return result;

    } catch (error: any) {
      throw new Error(`Failed to process callback: ${error.message}`);
    }
  }

  /**
   * Get job status by Smile Job ID
   */
  async getJobStatus(smileJobId: string): Promise<any> {
    try {
      // Note: This would require implementing the job status check
      // The current smile-identity-core package might not have this method
      // You would need to make a direct API call or use an updated version
      
      throw new Error('Job status check not implemented. Use callbacks for real-time updates.');
      
    } catch (error: any) {
      throw new Error(`Failed to get job status: ${error.message}`);
    }
  }

  /**
   * Validate the biometric KYC request
   */
  private validateBiometricKycRequest(request: BiometricKycRequest): void {
    const requiredFields = [
      'userId', 'jobId', 'firstName', 'lastName', 
      'country', 'idType', 'idNumber', 'dateOfBirth', 'selfieImage'
    ];

    for (const field of requiredFields) {
      if (!request[field as keyof BiometricKycRequest]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate date format (yyyy-mm-dd)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(request.dateOfBirth)) {
      throw new Error('Date of birth must be in yyyy-mm-dd format');
    }

    // Validate country code (2 letters)
    if (request.country.length !== 2) {
      throw new Error('Country must be a 2-letter country code');
    }
  }

  /**
   * Generate unique job ID
   */
  generateJobId(prefix: string = 'KYC'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Generate unique user ID
   */
  generateUserId(prefix: string = 'USER'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}_${timestamp}_${random}`;
  }
}