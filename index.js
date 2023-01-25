'use strict';
const express = require('express');
const cors = require('cors');
const session = require('express-session');

// routes
const loginRoute = require('./routes/login');
const riddlesRoute = require('./routes/riddles');
const usersRoute = require('./routes/user');
const ordersRoute = require('./routes/order');
const timesRoute = require('./routes/times');

// init express
const app = new express();
const port = 3001;

// set up cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// app.use(session({
//   secret: 'upi',
//   resave: false,
//   saveUninitialized: false,
// }));

app.use(express.json());

app.use('/api', loginRoute);
app.use('/api/foods', riddlesRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/times', timesRoute);
app.use('/api/users', usersRoute);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});