/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function showAnswers(id) {
  const sql = `SELECT * FROM answers WHERE question_id=${id} AND archived=0`;
  return executeDb(sql, [id]);
}

function createNewAnswer(answer, question_id, user_id) {
  const sql = 'INSERT INTO answers (answer, question_id, user_id) VALUES (?, ?, ?)';
  return executeDb(sql, [answer, question_id, user_id]);
}

function patchAnswer(id, answer, user_id) {
  const sql = `UPDATE answers SET answer = ? WHERE id=${id.id} AND user_id=${user_id}`;
  return executeDb(sql, [answer, user_id]);
}

function removeAnswer(id, user_id) {
  const sql = `UPDATE answers SET archived=1 WHERE id=${id.id} AND user_id=${user_id}`;
  return executeDb(sql, [id, user_id]);
}

function getAnswerDesc() {
  const sql = 'SELECT * FROM answers ORDER BY created_at ASC';
  return executeDb(sql);
}
function getAnswerAsc() {
  const sql = 'SELECT * FROM answers ORDER BY created_at DESC';
  return executeDb(sql);
}

module.exports = {
  showAnswers,
  createNewAnswer,
  patchAnswer,
  removeAnswer,
  getAnswerAsc,
  getAnswerDesc,
};
