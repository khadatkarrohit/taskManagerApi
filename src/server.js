const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const tasksApi = require('./routes/tasksApi');

const port = process.env.PORT || 8080;

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api/tasks', tasksApi);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;