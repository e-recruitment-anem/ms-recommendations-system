import { count_similarities } from '../helpers/utils';

// Calculate the similarities between offers and profile
const offerWorker = (offers, profiles) => {
  const matchTable = [];
  for (let index = 0; index < offers.length; index++) {
    const offer = offers[index];

    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];

      const match = count_similarities(offer.skills, profile.skills);

      matchTable.push({
        offer: offer.title,
        profile: profile.name,
        match: (match / offer.skills.length) * 100,
      });
    }
  }

  return matchTable;
};

// Calculate the similarities between profile and offers
const profileWorker = (profiles, offers) => {
  const matchTable = [];
  for (let index = 0; index < profiles.length; index++) {
    const profile = profiles[index];

    for (let index = 0; index < offers.length; index++) {
      const offer = offers[index];

      const match = count_similarities(profile.skills, offer.skills);

      matchTable.push({
        profile: profile.name,
        offer: offer.title,
        match: (match / profile.skills.length) * 100,
      });
    }
  }

  return matchTable;
};

// Process Data
export const preWorker = async (learner, users, items, type) => {
  let matchTable = type === 'offer' ? offerWorker(users, items) : profileWorker(users, items);

  for await (const item of matchTable) {
    if (item.match < 40) {
      if (type === 'offer') {
        await learner.viewed(item.offer, item.profile);
      } else if (type === 'profile') {
        await learner.viewed(item.profile, item.offer);
      }
    }
  }

  return learner;
};

export const processOffer = async (learner, offer, profiles) => {
  // Load offer
  await learner.newUser(offer.title);

  const matchTable = offerWorker([offer], profiles);

  for await (const item of matchTable) {
    if (item.match < 40) {
      await learner.viewed(item.offer, item.profile);
    }
  }
};

export const processProfile = async (learner, profile, offers) => {
  // Load offer
  await learner.newUser(profile.name);

  const matchTable = profileWorker([profile], offers);

  for await (const item of matchTable) {
    if (item.match < 40) {
      await learner.viewed(item.profile, item.offer);
    }
  }
};
