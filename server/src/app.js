import express from 'express';
import cors from 'cors';
import auth from './routes/auth.js';
import listingsRoute from './routes/listings.js';
import bidsRoute from './routes/bids.js';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/auth', auth);
app.use('/listings', listingsRoute);
app.use('/bids', bidsRoute);

export default app;
