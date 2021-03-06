import genArr from './array-generator';

const difficultyLevel = (difficulty: number) => {
  switch (difficulty) {
    case 0:
      return {
        info: 'are you kidding me?',
        range: 220,
        lifeSpeed: 0
      };
    case 1:
    case 2:
      return {
        info: 'novice',
        range: 120,
        lifeSpeed: 0.05
      };
    case 3:
    case 4:
      return {
        info: 'apprentice',
        range: 80,
        lifeSpeed: 0.10
      };
    case 5:
    case 6:
      return {
        info: 'adept',
        range: 40,
        lifeSpeed: 0.15
      };
    case 7:
    case 8:
      return {
        info: 'expert',
        range: 20,
        lifeSpeed: 0.20
      };
    case 9:
    case 10:
      return {
        info: 'master',
        range: 8,
        lifeSpeed: 0.25
      };
    default:
      throw new Error('Unknown difficulty');
  }
};

const randomNumber = (min: number, max: number) => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

export default (difficulty: number) => {
  const area = genArr([-110, 110]);
  const areaLength = area.length - 1;
  const areaStart = area[0];
  const areaEnd = area[areaLength];

  const { info, range, lifeSpeed } = difficultyLevel(difficulty);
  let hotzoneStart = randomNumber(areaStart, areaEnd);
  let hotzoneEnd = hotzoneStart + range;

  //  checks if the hotzone exceeds the base arrays limits
  if (hotzoneEnd > areaEnd) {
    const diff = hotzoneEnd - areaEnd;

    if (!area.includes(hotzoneStart - diff)) {
      throw new Error(`
        The value ${hotzoneStart - diff} exceeds current array params. 
        Start: ${areaStart} || End: ${areaEnd}`);
    }
    // adjust the hotzone values
    hotzoneStart -= diff;
    hotzoneEnd = hotzoneStart + range;
  }

  const hotzone = genArr([hotzoneStart, hotzoneEnd]);
  const hotzoneLength = hotzone.length;

  if (difficulty === 0) {
    const unlockzone = hotzone;
    return {
      hotzone, unlockzone, info, lifeSpeed
    };
  }

  // unlockzone start at 35% of hotzone, ends at 75%
  const unStart = Math.ceil((35 / 100) * hotzoneLength);
  const unEnd = Math.ceil((75 / 100) * hotzoneLength);

  const unlockzone = genArr([hotzone[unStart], hotzone[unEnd]]);

  return {
    hotzone, unlockzone, info, lifeSpeed
  };
};
