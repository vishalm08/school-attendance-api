const db = require('../config/db');

exports.createPeriod = async (req, reply) => {
  try {
    const { class_id, subject, start_time, end_time, period_number } = req.body;

    const missingFields = [];

    if (!class_id) missingFields.push('class_id');
    if (!subject) missingFields.push('subject');
    if (!start_time) missingFields.push('start_time');
    if (!end_time) missingFields.push('end_time');
    if (!period_number) missingFields.push('period_number');

    if (missingFields.length > 0) {
      return reply.code(400).send({
        error: `Missing required field(s): ${missingFields.join(', ')}`,
      });
    }

    await db.query(
      'insert into periods (class_id, subject, start_time, end_time, period_number) values (?, ?, ?, ?, ?)',
      [class_id, subject, start_time, end_time, period_number]
    );

    reply.send({ msg: 'Period created' });
  } catch (err) {
    console.error('Error creating period:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};
