import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { serve } from 'inngest/express';
import { inngest, functions } from './lib/inngest.js';
import { clerkMiddleware } from '@clerk/express';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoute from './routes/sessionRoute.js';

const app = express();

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use(clerkMiddleware());

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/chat', chatRoutes);
app.use('/api/session', sessionRoute);


app.get('/helth', (req, res) => {
  res.status(200).json({msg: 'Helth endpoint'});
});

// make our app ready for production
if(ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  }); 
} else {
  console.log("Else Part")
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log("💥 Error starting the Server: ", error)
  }
};

startServer();