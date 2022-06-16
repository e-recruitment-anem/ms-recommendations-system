import express from 'express';
import { addProfile, getProfileOffers, getSimilarProfiles, rateProfileOffer } from '../controllers/profileController';

const router = express.Router();

// Recomendation profile - offer
router.post('/offers', getProfileOffers);

// Add profile rating
router.post('/rate', rateProfileOffer);

// Add new profile to dataset
router.post('/add', addProfile);

// Recommend similar profiles
router.post('/similar', getSimilarProfiles);

export { router as profileRoutes };