import { learner } from 'pprec';
import { preWorker } from '.';
import { offers, profiles } from '../helpers/dataset';

let profileLearner = learner({ learningRate: 1e-3 });

const profileTrainer = async () => {
  // Load data
  profiles.forEach((profile) => {
    profileLearner.newUser(profile.name);
  });

  offers.forEach((offre) => {
    profileLearner.newItem(offre.title);
  });

  // Process data
  const processedLearner = await preWorker(profileLearner, profiles, offers, 'profile');

  profileLearner = processedLearner
};

export {profileLearner, profileTrainer};
