import { Request, Response } from 'express';
import { convertCurrency } from '../services/conversion.service';
import { catchAsync } from '../utils/catchAsync';
import { convertQuerySchema } from '../validators/convert.validator';

export const handleCurrencyConversion = catchAsync(async (req: Request, res: Response) => {
  const validated = convertQuerySchema.parse(req.query);

  const { convertedAmount, rate } = await convertCurrency(validated.from, validated.to, validated.amount);

  return res.status(200).json({
    status: 'success',
    message: `Converted ${validated.amount} ${validated.from} to ${convertedAmount} ${validated.to} at a rate of ${rate}`,
    data: {
      rate,
      convertedAmount,
    },
  });
});
