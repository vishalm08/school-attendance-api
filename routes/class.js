async function classRoutes(fastify, options) {
  const { createClass, getClasses } = require('../controllers/class');

  fastify.post('/classes', createClass);
  fastify.get('/classes', getClasses);
}
module.exports = classRoutes;
