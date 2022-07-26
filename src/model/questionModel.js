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

function getQuestions() {
  const sql = 'SELECT * FROM questions';
  return executeDb(sql);
}

function createNewQuestion(title, content) {
  const sql = 'INSERT INTO questions (title, content) VALUES (?, ?)';
  return executeDb(sql, [title, content]);
}

module.exports = {
  getQuestions,
  createNewQuestion,
};
