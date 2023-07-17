//create web server
//create router object
//add routes
//export router object
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Comments = require('../models/comments');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());
