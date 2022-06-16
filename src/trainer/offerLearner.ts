import { learner } from 'pprec';
import { preWorker } from '.';
import { offers, profiles } from '../helpers/dataset';

let offerLearner = learner({ learningRate: 1e-3 });

const offerTrainer = async () => {
  // Load data
  offers.forEach((offre) => {
    offerLearner.newUser(offre.title);
  });

  profiles.forEach((profile) => {
    offerLearner.newItem(profile.name);
  });

  // Process data
  const processedLearner = await preWorker(offerLearner, offers, profiles, 'offer');

  offerLearner = processedLearner
};

export {offerLearner, offerTrainer};
