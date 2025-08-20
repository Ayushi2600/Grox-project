// @v1/modules/kyc/routes/smileId.route.ts
import { Router } from 'express';
import { SmileIdController } from '../controller/smileId.controller';

const router = Router();
const smileIdController = new SmileIdController();

// Biometric KYC routes
router.post('/biometric-kyc', smileIdController.submitBiometricKyc);

// Callback route for Smile ID
router.post('/callback', smileIdController.handleCallback);

// Job status route
router.get('/job-status/:smileJobId', smileIdController.getJobStatus);

// Health check route
router.get('/health', smileIdController.healthCheck);

// Generate test IDs for development
router.get('/generate-ids', smileIdController.generateTestIds);

// Get supported ID types for a country
router.get('/supported-id-types/:country', smileIdController.getSupportedIdTypes);

export default router;