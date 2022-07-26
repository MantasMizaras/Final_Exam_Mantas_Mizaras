const express = require('express');
const { validateQuestion } = require('../middleware');
const { getQuestions, createNewQuestion } = require('../model/questionModel');

const questionRoutes = express.Router();

questionRoutes.get('/question', async (req, res) => {
  try {
    const questionsArr = await getQuestions();
    res.json(questionsArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

questionRoutes.post('/question', validateQuestion, async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await createNewQuestion(title, content);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully created!');
      return;
    }
    res.status(400).json('Question was not added!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
});

module.exports = questionRoutes;
