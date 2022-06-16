/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import chalk from 'chalk';

import errorHandler from '../helpers/errorHandler';
import { profileLearner } from '../trainer/profileLearner';
import { offers, profiles } from '../helpers/dataset';
import { calculateAddedWeight } from '../helpers/utils';
import { processOffer } from '../trainer';

/**
 * Get recommended offer.
 * @route /profile/offers
 */

// working fine
const getProfileOffers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { profile } = req.body;

    // Get the recommended profiles for the given offer
    const learner = profileLearner;

    // Generate k recommendations for a offer
    const data = await learner.recommendItems(profile, 2);

    const suggestion = offers.filter(
      (offer) => data.indexOf(offer.title) != -1
    );

    res.status(200).json({ status: 'success', suggestion });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// not working
const rateProfileOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { offer, profile } = req.body;

    const learner = profileLearner;

    // Get offer and profile
    const trainerOffer = offers.find((o) => o.title === offer);
    const trainerProfile = profiles.find((p) => p.name === profile);

    // Calculate weight
    const weight = calculateAddedWeight(trainerProfile, trainerOffer);

    // ADD the rate
    await learner.addRating(profile, offer, weight);

    res.status(200).json({ status: 'success', message: 'rate was added' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// working fine
const addProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, skills } = req.body;
    const profile = { name, skills };

    // Get the recommended profiles for the given offer
    const learner = profileLearner;

    processOffer(learner, profile, offers);

    res.status(200).json({ status: 'success', message: 'offer was added' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

// working fine
const getSimilarProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { profile } = req.body;

    // Get the recommended profiles for the given offer
    const learner = profileLearner;

    // ADD the rate
    const similarProfiles = learner.mostSimilarUsers(profile, 2);

    res.status(200).json({ status: 'success', similarProfiles });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

export {
  getProfileOffers,
  rateProfileOffer,
  getSimilarProfiles,
  addProfile,
};
