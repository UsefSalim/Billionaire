require('dotenv').config({ path: './config/.env' });
// packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const { log: terminal } = console;

const authAPi = require('./routes/auth.routes');
const roomApi = require('./routes/room.routes');
const adminApi = require('./routes/admin.routes');

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
process.env.NODE_ENV === 'developpement' && app.use(morgan('dev'));

// Db Connexion
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => terminal('Mongo Db Connected'))
  .catch((err) => terminal(`error connection to the DataBase : ${err}`));
// Routes

app.use('/api/auth', authAPi);
app.use('/api/profile', roomApi);
app.use('/api/admin', adminApi);

// app express
app.listen(PORT, () => {
  terminal(`app listning : localhost:${PORT}`);
});
