import express from 'express';
import { addOffer, getOfferProfiles, getSimilarOffers, rateOfferProfile } from '../controllers/offerController';

const router = express.Router();

// Recomendation offer - profile
router.post('/profiles', getOfferProfiles);

// Add profile rating
router.post('/rate', rateOfferProfile);

// Add new offer to dataset
router.post('/add', addOffer);

// Recommend similar offers
router.post('/similar', getSimilarOffers);

export { router as offreRoutes };
