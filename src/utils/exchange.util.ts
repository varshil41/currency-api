// Generates a random exchange rate between 50 and 100

export const getRandomRate = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
  return parseFloat((Math.random() * (100 - 50) + 50).toFixed(2));
};
