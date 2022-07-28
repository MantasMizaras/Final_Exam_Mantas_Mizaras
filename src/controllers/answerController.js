/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
const { showAnswers, createNewAnswer, patchAnswer, removeAnswer } = require('../model/answerModel');

const getAnswers = async (req, res) => {
  const { id } = req.params;
  try {
    const answersArr = await showAnswers(id);
    res.json(answersArr);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postAnswer = async (req, res) => {
  const { answer } = req.body;
  const { id } = req.params;
  const idFromToken = req.userId;
  try {
    const result = await createNewAnswer(answer, id, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Answer succesfully added!');
      return;
    }
    res.status(400).json('Answer was not added!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
};

const updateAnswer = async (req, res) => {
  const id = req.params;
  const { answer } = req.body;
  const idFromToken = req.userId;
  try {
    const result = await patchAnswer(id, answer, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Answer succesfully updated!');
      return;
    }
    res.status(400).json('Answer was not updated!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
};

const deleteAnswer = async (req, res) => {
  const id = req.params;
  const idFromToken = req.userId;
  try {
    const result = await removeAnswer(id, idFromToken);
    if (result.affectedRows === 1) {
      res.status(201).json('Answer succesfully deleted!');
      return;
    }
    res.status(400).json('Answer was not deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong with delete');
  }
};

module.exports = { getAnswers, postAnswer, updateAnswer, deleteAnswer };
