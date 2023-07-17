//create web server
const express = require('express');     
const router = express.Router();        //create router object
const Comment = require('../models/comment'); //import comment model
const Post = require('../models/post'); //import post model
const User = require('../models/user'); //import user model
const { check, validationResult } = require('express-validator'); //import express validator
const { ensureAuthenticated } = require('../config/auth'); //import authentication

