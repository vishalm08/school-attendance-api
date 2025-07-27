const db = require('../config/db');

exports.markAttendance = async (req, reply) => {
  try {
    const { student_id, period_id, date, status } = req.body;

    if (!student_id || !period_id || !date || !status) {
      return reply.code(400).send({ error: 'All fields are required' });
    }

    const [existing] = await db.query(
      `select * from attendance
       where student_id = ?
       and period_id = ?
       and date = ?`,
      [student_id, period_id, date]
    );

    if (existing.length > 0) {
      return reply.code(400).send({ error: 'Attendance already marked' });
    }

    await db.query(
      'insert into attendance (student_id, period_id, date, status) values (?, ?, ?, ?)',
      [student_id, period_id, date, status]
    );

    const [student] = await db.query('select name from students where id = ?', [
      student_id,
    ]);

    const [period] = await db.query(
      `select subject, start_time, end_time from periods where id = ?`,
      [period_id]
    );

    const [classInfo] = await db.query(
      `select c.class_name from classes c
       join students s on c.id = s.class_id
       where s.id = ?`,
      [student_id]
    );

    const now = new Date();
    const update_time = now.toTimeString().split(' ')[0];

    const attendanceData = {
      student_name: student[0].name,
      class_name: classInfo[0].class_name,
      period_name: period[0].subject,
      period_time: `${period[0].start_time} - ${period[0].end_time}`,
      date,
      status,
      update_time,
    };

    console.log('Attendance Data:::::::::', attendanceData);

    req.io.emit('attendanceUpdate', attendanceData);

    reply.send({ msg: 'Attendance marked' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};

exports.getAttendance = async (req, reply) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const [rows] = await db.query(
      `select a.id, s.name as student, p.subject, a.date
         from attendance a
       join students s on a.student_id = s.id
       join periods p on a.period_id = p.id
       limit ? offset ?`,
      [+limit, +offset]
    );

    reply.send(rows);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    reply.code(500).send({ error: 'Internal server error' });
  }
};
