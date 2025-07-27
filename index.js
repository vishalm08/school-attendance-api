const fastify = require('fastify')({ logger: true });
const path = require('path');
const dotenv = require('dotenv');
const fastifyJwt = require('@fastify/jwt');
const fastifyCors = require('@fastify/cors');
const fastifySocketIO = require('fastify-socket.io');

dotenv.config({ path: path.join(__dirname, '.env') });

fastify.register(fastifyCors, { origin: true });
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET });
fastify.register(fastifySocketIO, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const db = require('./config/db');

fastify.register(require('./routes/auth'), { prefix: '/api' });
fastify.register(require('./routes/class'), { prefix: '/api' });
fastify.register(require('./routes/student'), { prefix: '/api' });
fastify.register(require('./routes/period'), { prefix: '/api' });
fastify.register(require('./routes/attendance'), { prefix: '/api' });

fastify.addHook('onRequest', async (req, reply) => {
  const publicRoutes = ['/api/login', '/api/register'];
  if (publicRoutes.includes(req.routerPath)) return;

  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }

  req.io = fastify.io;
});

fastify.ready().then(() => {
  fastify.io.on('connection', (socket) => {
    fastify.log.info(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      fastify.log.info(`Client disconnected: ${socket.id}`);
    });
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
