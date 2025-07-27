const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const pino = require('pino')();

exports.login = async (req, reply) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return reply
        .code(400)
        .send({ error: 'Username and password are required' });
    }

    const [users] = await db.query('select * from users where username = ?', [
      username,
    ]);

    if (
      users.length === 0 ||
      !(await bcrypt.compare(password, users[0].password))
    ) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return reply.send({ token });
  } catch (err) {
    pino.error('Login error:', err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};
