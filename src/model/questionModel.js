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

function showQuestions() {
  const sql = 'SELECT * FROM questions WHERE archived=0';
  return executeDb(sql);
}

function createNewQuestion(title, content, user_id) {
  const sql = 'INSERT INTO questions (title, content, user_id) VALUES (?, ?, ?)';
  return executeDb(sql, [title, content, user_id]);
}

function patchQuestion(id, title, content) {
  const sql = `UPDATE questions SET title = ? ,content = ? WHERE id=${id.id} `;
  return executeDb(sql, [title, content]);
}

function removeQuestion(id) {
  // const sql = `DELETE FROM questions WHERE id=${id.id}`;
  const sql = `UPDATE questions SET archived=1 WHERE id=${id.id} `;
  return executeDb(sql, [id]);
}

module.exports = {
  showQuestions,
  createNewQuestion,
  patchQuestion,
  removeQuestion,
};
