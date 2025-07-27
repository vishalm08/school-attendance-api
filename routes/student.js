async function studentRoutes(fastify, options) {
  const { createStudent } = require('../controllers/student');

  fastify.post('/students', createStudent);
}
module.exports = studentRoutes;
