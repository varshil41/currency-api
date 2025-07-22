import redisClient from '../config/redis';
import { AppError } from '../utils/appError';
import { getRandomRate } from '../utils/exchange.util';

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number,
): Promise<{
  rate: number;
  convertedAmount: number;
}> => {
  let dummyRate = 0;
  const key = `${from.toUpperCase()}${to.toUpperCase()}`;

  const cachedRate = await redisClient.get(key);

  if (cachedRate) {
    console.log('Getting rate from redis');
    dummyRate = parseFloat(cachedRate);
  } else {
    console.log('Getting rate from custome rate logic and setting it in redis');
    dummyRate = await getRandomRate();
    await redisClient.setEx(key, 60, dummyRate.toString());
  }

  const rates: Record<string, number> = {
    USDINR: dummyRate,
    INRUSD: 1 / dummyRate,
  };

  const rate = rates[key];

  if (!rate) {
    throw new AppError(`Conversion rate for ${from} to ${to} not supported.`, 400);
  }

  return {
    rate,
    convertedAmount: parseFloat((amount * rate).toFixed(2)),
  };
};
