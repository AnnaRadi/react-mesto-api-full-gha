const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const extractJwt = require('./middlewares/extractJwt');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 4000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(extractJwt);

app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);

mongoose.connect('mongodb://0.0.0.0/mestodb', { useNewUrlParser: true });

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен ${PORT}`);
});
