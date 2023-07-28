const express = require("express");
const app = express();
require('dotenv').config();
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const apiRouter = require('./Router/empr');
const userRouter = require('./Router/Usere');
const  path=require('path')
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname,'/build')));

const PORT = process.env.PORT||5000;

app.use('/api', apiRouter);
app.use('/api', userRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

require('./db');
app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname,'/build/index.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

