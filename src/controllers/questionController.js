/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
const { showQuestions, createNewQuestion, patchQuestion, removeQuestion } = require('../model/questionModel');

const getQuestions = async (req, res) => {
  try {
    const questionsArr = await showQuestions();
    res.json(questionsArr);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postQuestion = async (req, res) => {
  const { title, content } = req.body;
  const idFromToken = req.userId;
  try {
    const result = await createNewQuestion(title, content, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully created!');
      return;
    }
    res.status(400).json('Question was not added!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
};

const updateQuestion = async (req, res) => {
  const id = req.params;
  const { title, content } = req.body;
  const idFromToken = req.userId;
  try {
    const result = await patchQuestion(id, title, content, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully updated!');
      return;
    }
    res.status(400).json('Question was not updated!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params;
  const idFromToken = req.userId;
  try {
    const result = await removeQuestion(id, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Question succesfully deleted!');
      return;
    }
    res.status(400).json('Question was not deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong with delete');
  }
};

module.exports = { getQuestions, postQuestion, updateQuestion, deleteQuestion };
