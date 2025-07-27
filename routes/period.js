async function periodRoutes(fastify, options) {
  const { createPeriod } = require('../controllers/period');

  fastify.post('/periods', createPeriod);
}
module.exports = periodRoutes;
