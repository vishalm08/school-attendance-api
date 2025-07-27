const db = require('../config/db');

exports.createStudent = async (req, reply) => {
  try {
    const { name, class_id } = req.body;

    if (!name || !class_id) {
      return reply.code(400).send({ error: 'Name and class_id are required' });
    }

    await db.query('insert into students (name, class_id) values (?, ?)', [
      name,
      class_id,
    ]);

    reply.send({ msg: 'Student added' });
  } catch (err) {
    console.error('Error creating student:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};
