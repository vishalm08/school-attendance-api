const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, reply) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};
