const express = require('express');
const { validateToken, validateAnswer } = require('../middleware');

const answerRoutes = express.Router();

const controller = require('../controllers/answerController');

answerRoutes.get('/question/:id/answer', controller.getAnswers);

answerRoutes.post('/question/:id/answer', validateAnswer, validateToken, controller.postAnswer);

answerRoutes.patch('/answer/:id', validateAnswer, validateToken, controller.updateAnswer);

answerRoutes.delete('/answer/:id', validateToken, controller.deleteAnswer);

answerRoutes.get('/answerasc', controller.showAnswerAsc);

answerRoutes.get('/answerdesc', controller.showAnswerDesc);

module.exports = answerRoutes;
