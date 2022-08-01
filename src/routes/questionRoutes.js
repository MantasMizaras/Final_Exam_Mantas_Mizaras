/* eslint-disable object-curly-newline */
const express = require('express');
const { validateQuestion, validateToken } = require('../middleware');

const questionRoutes = express.Router();

const controller = require('../controllers/questionController');

questionRoutes.get('/question', controller.getQuestions);

questionRoutes.post('/question', validateQuestion, validateToken, controller.postQuestion);

questionRoutes.patch('/question/:id', validateQuestion, validateToken, controller.updateQuestion);

questionRoutes.delete('/question/:id', validateToken, controller.deleteQuestion);

questionRoutes.get('/questionasc', controller.showQuestAsc);

questionRoutes.get('/questiondesc', controller.showQuestDesc);

module.exports = questionRoutes;
