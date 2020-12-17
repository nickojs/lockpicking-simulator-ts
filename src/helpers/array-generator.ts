export default (limits: [number, number]) => {
  const genArray = [];
  const [start, end] = limits;

  for (let i = start; i < end + 1; i++) {
    genArray.push(i);
  }

  return genArray;
};
