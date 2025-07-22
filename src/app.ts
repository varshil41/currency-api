import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './middlewares/error.middleware';
import convertRoutes from './routes/convert.route';
import { setupSwaggerDocs } from './swagger';

dotenv.config();

const app = express();

app.use(express.json());

setupSwaggerDocs(app);

app.use('/api', convertRoutes);

app.use('/', (req, res) => {
  res.send('Currency  Conversion API');
});

app.use(errorHandler);

export default app;
