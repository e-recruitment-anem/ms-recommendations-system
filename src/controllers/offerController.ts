/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import chalk from 'chalk';

import errorHandler from '../helpers/errorHandler';
import { offerLearner } from '../trainer/offerLearner';
import { offers, profiles } from '../helpers/dataset';
import { calculateAddedWeight } from '../helpers/utils';
import { processOffer } from '../trainer';

/**
 * Get recommended profiles.
 * @route /offer/profiles
 */

// working fine
const getOfferProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { offer } = req.body;

    // Get the recommended profiles for the given offer
    const learner = offerLearner;

    // Generate k recommendations for a offer
    const data = await learner.recommendItems(offer, 2);

    const suggestion = profiles.filter(
      (profile) => data.indexOf(profile.name) != -1
    );

    res.status(200).json({ status: 'success', suggestion });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// not working
const rateOfferProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { offer, profile } = req.body;

    // Get the recommended profiles for the given offer
    const learner = offerLearner;

    // Get offer and profile
    const trainerOffer = offers.find((o) => o.title === offer);
    const trainerProfile = profiles.find((p) => p.name === profile);

    // Calculate weight
    const weight = calculateAddedWeight(trainerOffer, trainerProfile);

    // ADD the rate
    await learner.addRating(offer, profile, weight);

    res.status(200).json({ status: 'success', message: 'rate was added' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// working fine
const addOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, skills } = req.body;
    const offer = { title, skills };

    // Get the recommended profiles for the given offer
    const learner = offerLearner;

    processOffer(learner, offer, profiles);

    res.status(200).json({ status: 'success', message: 'offer was added' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// working fine
const getSimilarOffers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { offer } = req.body;

    // Get the recommended profiles for the given offer
    const learner = offerLearner;

    // ADD the rate
    const similarOffers = learner.mostSimilarUsers(offer, 2);

    res.status(200).json({ status: 'success', similarOffers });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

export {
  getOfferProfiles,
  rateOfferProfile,
  getSimilarOffers,
  addOffer,
};
