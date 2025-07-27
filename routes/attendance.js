async function attendanceRoutes(fastify, options) {
  const {
    markAttendance,
    getAttendance,
  } = require('../controllers/attendance');

  fastify.post('/attendance', markAttendance);
  fastify.get('/attendance', getAttendance);
}
module.exports = attendanceRoutes;
