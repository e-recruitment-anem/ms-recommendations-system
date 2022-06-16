import { profiles } from './dataset';

export const count_similarities = (arrayA, arrayB) => {
  var matches = 0;
  for (let i = 0; i < arrayA.length; i++) {
    if (arrayB.indexOf(arrayA[i]) != -1) matches++;
  }
  return matches;
};

export const calculateAddedWeight = (userItems, match) => {
  let weight = 0;

  weight += Math.round((match / userItems.length) * 5);

  return weight;
};

export const weightedFilter = (users, items, type, user?) => {
  const matchTable = [];
  for (let index = 0; index < users.length; index++) {
    const user = users[index];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      const match = count_similarities(user.skills, item.skills);

      matchTable.push({
        user: type === 'profile' ? user.name : user.title,
        item: type === 'profile' ? item.title : item.name,
        match: (match / user.skills.length) * 100,
      });
    }
  }

  const selectedItems = matchTable.filter(
    (el) => el.user === user && el.match > 50
  );

  console.log(selectedItems);
};

// Helper function

export const weightedFilterProfile = (name, suggestions) => {
  const matchTable = [];
  for (let index = 0; index < suggestions.length; index++) {
    const suggestion = suggestions[index];
    const profile = profiles.find((el) => el.name === name);

    const match = count_similarities(profile.skills, suggestion.skills);

    matchTable.push({
      profile: profile.name,
      suggestion: suggestion.title,
      match: (match / profile.skills.length) * 100,
    });
  }

  const selectedItems = matchTable.filter((el) => el.match > 50);

  return selectedItems
};
