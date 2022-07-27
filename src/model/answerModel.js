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
  const sql = `SELECT * FROM answers WHERE question_id=${id} `;
  return executeDb(sql, [id]);
}

function createNewAnswer(answer, question_id) {
  const sql = 'INSERT INTO answers (answer, question_id) VALUES (?, ?)';
  return executeDb(sql, [answer, question_id]);
}

function patchAnswer(id, answer) {
  const sql = `UPDATE answers SET answer = ? WHERE id=${id.id} `;
  return executeDb(sql, [answer]);
}

function removeAnswer(id) {
  const sql = `DELETE FROM answers WHERE id=${id.id} `;
  return executeDb(sql, [id]);
}

module.exports = {
  showAnswers,
  createNewAnswer,
  patchAnswer,
  removeAnswer,
};
