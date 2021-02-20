require('dotenv').config({ path: './config/.env' });
// packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const { log: terminal } = console;

const authAPi = require('./routes/auth.routes');
const roomApi = require('./routes/room.routes');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
process.env.NODE_ENV === 'developpement' && app.use(morgan('tiny'));

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
app.use('/api/admin/room', roomApi);

// app express
app.listen(PORT, () => {
  terminal(`app listning : localhost:${PORT}`);
});
