/* eslint-disable object-curly-newline */
const express = require('express');
const { validateQuestion, validateToken } = require('../middleware');
const { getQuestions, createNewQuestion, updateQuestion, deleteQuestion } = require('../model/questionModel');

const questionRoutes = express.Router();

questionRoutes.get('/question', async (req, res) => {
  try {
    const questionsArr = await getQuestions();
    res.json(questionsArr);
  } catch (error) {
    res.sendStatus(500);
  }
});

questionRoutes.post('/question', validateQuestion, validateToken, async (req, res) => {
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

questionRoutes.patch('/question/:id', validateQuestion, validateToken, async (req, res) => {
  const id = req.params;
  const { title, content } = req.body;
  try {
    const result = await updateQuestion(id, title, content);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully updated!');
      return;
    }
    res.status(400).json('Question was not updated!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
});

questionRoutes.delete('/question/:id', validateToken, async (req, res) => {
  const id = req.params;
  try {
    const result = await deleteQuestion(id);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully deleted!');
      return;
    }
    res.status(400).json('Question was not deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong with delete');
  }
});

module.exports = questionRoutes;
