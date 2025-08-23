import { WebApi, Signature, Utilities } from "smile-identity-core";

const partner_id = process.env.SMILE_ID_PARTNER_ID as string;
const api_key = process.env.SMILE_ID_API_KEY as string;
const sid_server = process.env.SMILE_ID_SERVER || "0"; // 0 = sandbox, 1 = production
const callback_url =
  process.env.SMILE_ID_CALLBACK_URL ||
  "https://8fac7959647a.ngrok-free.app/api/v1/kyc/callback";

export interface IdInfo {
  country: string;
  id_type: string;
  id_number: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  gender?: string;
  phone_number?: string;
}

class SmileIdService {
  private connection: WebApi;

  constructor() {
    this.connection = new WebApi(partner_id, callback_url, api_key, sid_server);
  }

  /**
   * Submit a biometric KYC job
   */
  async submitJob(
    userId: string,
    jobId: string,
    selfieBase64: string,
    idCardBase64: string,
    idInfo: IdInfo
  ) {
    const partner_params = { job_id: jobId, user_id: userId, job_type: 1 };

    // Image details: 2 = selfie, 6 = liveness
    const image_details = [
      { image_type_id: 2, image: selfieBase64 },
      { image_type_id: 3, image: idCardBase64 },
    ];

    const options = {
      return_job_status: true,
      return_history: true,
      return_image_links: true,
      signature: true,
    };

    const response = await this.connection.submit_job(
      partner_params,
      image_details,
      idInfo,
      options
    );
    return response;
  }

  /**
   * Verify Smile ID’s callback authenticity
   */
  verifyCallback(timestamp: string, signature: string) {
    const sig = new Signature(partner_id, api_key);
    return sig.confirm_signature(timestamp, signature);
  }

  /**
   * Get Job Status (optional re-check)
   */
  async getJobStatus(userId: string, jobId: string) {
    const utils = new Utilities(partner_id, api_key, sid_server);
    return await utils.get_job_status(userId, jobId, {
      return_history: true,
      return_image_links: true,
    });
  }

  /**
   * Generate a Smile ID Web Token
   */
  async generateWebToken(userId: string, jobId: string) {
    const response = await this.connection.get_web_token({
      user_id: userId,
      job_id: jobId,
      product: "biometric_kyc", // can be 'biometric_kyc', 'document_verification' etc.
      callback_url: callback_url,
    });

    return response; // contains token + expiry
  }
}

export const smileIdService = new SmileIdService();
