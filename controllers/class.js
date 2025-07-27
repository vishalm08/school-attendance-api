const db = require('../config/db');

exports.createClass = async (req, reply) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return reply.code(400).send({ error: 'Invalid class name' });
    }

    await db.query('insert into classes (class_name) values (?)', [name]);
    reply.send({ msg: 'Class created' });
  } catch (err) {
    console.error('Error creating class:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

exports.getClasses = async (req, reply) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const [rows] = await db.query('select * from classes limit ? offset ?', [
      +limit,
      +offset,
    ]);
    reply.send(rows);
  } catch (err) {
    console.error('Error fetching classes:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};
