import dotenv from 'dotenv';
import cors from 'cors';
import express, { Response, Request } from 'express';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import orderRoutes from './routes/orderRoutes';
import path from 'path';
import mercadopago from 'mercadopago';

dotenv.config();

export const app = express();
// request recongnition
connectDB();
/* CUSTOM REQUEST - USER */

//idk if this is the best way to do this...
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        iat: number;
        exp: number;
        name: string;
        isAdmin: boolean;
      };
    }
  }
}

/* CORS */
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);
/* --------------- REQUEST RECOGNITION --------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------- PAYMENTS --------------- */
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN as string,
});

/* --------------- Routes --------------- */

//start

app.get('/api/config/paypal', (req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Routes

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

console.log(path.join(__dirname, '../../uploads'));

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('API is running');
  });
}

app.use(errorHandler);
//Not found
app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

/* --------------- LISTEN --------------- */
// const port = process.env.PORT || '4000';
app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
