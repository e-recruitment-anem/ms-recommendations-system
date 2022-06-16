import express, { Router } from 'express';

import cors from 'cors';

import morgan from 'morgan';

import * as dotenv from 'dotenv';
dotenv.config();

import { json, urlencoded } from 'body-parser';
// import { offerTrainer } from './trainer/offerLearner';
import { profileTrainer, profileLearner } from './trainer/profileLearner';
import { offerTrainer } from './trainer/offerLearner';

export default function initializeServer(router: Router) {
  const app = express();

  offerTrainer()
  profileTrainer()

  const plearner = profileLearner;
  const olearner = profileLearner;

  plearner.save('profile');
  olearner.save('offer');

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());

  app.use('/recommendation', router);

  return app;
}
