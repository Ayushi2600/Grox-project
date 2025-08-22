// @v1/modules/kyc/services/smileId.service.ts
import * as smileIdentityCore from "smile-identity-core";

interface PartnerParams {
  job_id: string;
  user_id: string;
  job_type: number;
  optional_info?: string;
  Photo?: string;
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

  // In-memory store for sandbox testing
  private jobs: Record<string, any> = {};

  constructor() {
    this.partnerId = process.env.SMILE_PARTNER_ID || "";
    this.apiKey = process.env.SMILE_API_KEY || "";
    this.sidServer = process.env.SMILE_SERVER || "0";
    this.defaultCallback = process.env.SMILE_DEFAULT_CALLBACK || "";

    if (!this.partnerId || !this.apiKey || !this.defaultCallback) {
      throw new Error(
        "Missing required Smile ID configuration in environment variables"
      );
    }

    const WebApi = smileIdentityCore.WebApi;
    this.webApi = new WebApi(
      this.partnerId,
      this.defaultCallback,
      this.apiKey,
      this.sidServer
    );
  }

  // Save job in-memory
  saveJob(jobId: string, data: any) {
    this.jobs[jobId] = { ...data, updatedAt: new Date() };
  }

  // Get job from in-memory store
  getJob(jobId: string) {
    return this.jobs[jobId] || null;
  }

  async submitBiometricKyc(request: BiometricKycRequest): Promise<any> {
    this.validateBiometricKycRequest(request);

    const partnerParams: PartnerParams = {
      job_id: request.jobId,
      user_id: request.userId,
      job_type: 1,
      optional_info: "Biometric KYC verification",
      Photo: request.selfieImage,
    };

    const imageDetails: ImageDetail[] = [];
    const selfieImageType = request.isBase64 ? 2 : 0;
    imageDetails.push({
      image_type_id: selfieImageType,
      image: request.selfieImage,
    });

    if (request.livenessImages?.length) {
      const livenessImageType = request.isBase64 ? 6 : 4;
      request.livenessImages.forEach((img) => {
        imageDetails.push({ image_type_id: livenessImageType, image: img });
      });
    }

    const idInfo: IdInfo = {
      first_name: request.firstName,
      last_name: request.lastName,
      country: request.country,
      id_type: request.idType,
      id_number: request.idNumber,
      dob: request.dateOfBirth,
      entered: "true",
    };

    const options: JobOptions = {
      return_job_status: request.returnJobStatus ?? false,
      return_history: request.returnHistory ?? false,
      return_image_links: request.returnImageLinks ?? false,
      signature: true,
    };

    const response = await this.webApi.submit_job(
      partnerParams,
      imageDetails,
      idInfo,
      options
    );

    const smileJobId = response?.data?.result?.SmileJobID || null;

    // Save job in memory as PENDING
    this.saveJob(request.jobId, {
      userId: request.userId,
      status: "PENDING",
      resultCode: null,
      resultText: null,
      confidenceValue: null,
      actions: null,
      smileJobId,
      partnerParams,
    });

    return {
      success: true,
      data: response,
      smileJobId,
      message: "Biometric KYC job submitted successfully",
    };
  }

  async processCallback(callbackData: any): Promise<any> {
    const partnerJobId = callbackData.PartnerParams?.job_id;
    const smileJobId = callbackData.SmileJobID;

    const existingJob = partnerJobId ? this.jobs[partnerJobId] : null;

    if (!existingJob) {
      throw new Error("Unknown job_id in callback");
    }

    if (existingJob.smileJobId && existingJob.smileJobId !== smileJobId) {
      throw new Error("Invalid SmileJobID in callback");
    }

    this.jobs[partnerJobId] = {
      ...existingJob,
      status: "COMPLETED",
      resultCode: callbackData.ResultCode,
      resultText: callbackData.ResultText,
      confidenceValue: callbackData.ConfidenceValue,
      actions: callbackData.Actions,
      smileJobId: smileJobId,
      updatedAt: new Date(),
    };

    const result = {
      smileJobId,
      resultCode: callbackData.ResultCode,
      resultText: callbackData.ResultText,
      confidenceValue: callbackData.ConfidenceValue,
      actions: callbackData.Actions,
      partnerParams: callbackData.PartnerParams,
      timestamp: callbackData.timestamp || new Date().toISOString(),
    };

    return result;
  }

  async getJobStatus(jobId: string): Promise<any> {
    const job = this.getJob(jobId);

    if (!job) {
      return { success: false, message: "Job not found", jobId };
    }

    return { success: true, data: job };
  }

  private validateBiometricKycRequest(request: BiometricKycRequest) {
    const requiredFields = [
      "userId",
      "jobId",
      "firstName",
      "lastName",
      "country",
      "idType",
      "idNumber",
      "dateOfBirth",
      "selfieImage",
    ];

    for (const field of requiredFields) {
      if (!request[field as keyof BiometricKycRequest]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(request.dateOfBirth))
      throw new Error("Date of birth must be yyyy-mm-dd");

    if (request.country.length !== 2)
      throw new Error("Country must be 2-letter code");
  }

  generateJobId(prefix: string = "KYC"): string {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  generateUserId(prefix: string = "USER"): string {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }
}
