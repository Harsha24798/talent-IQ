import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

const app = express();

const __dirname = path.resolve();

app.get('/helth', (req, res) => {
  res.status(200).json({msg: 'Helth endpoint'});
});

app.get('/books', (req, res) => {
  res.status(200).json({msg: 'Books endpoint'});
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

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});