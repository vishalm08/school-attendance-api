async function authRoutes(fastify, options) {
  const { login } = require('../controllers/auth');

  fastify.post('/login', login);
}
module.exports = authRoutes;
