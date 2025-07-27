module.exports = function getPaginationParams(req) {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  return { limit, offset };
};
