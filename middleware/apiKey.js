// Simple protection for write routes. If API_KEY is set in env,
// POST/PUT/DELETE requests must send header:  x-api-key: <your key>
module.exports = (req, res, next) => {
  const key = process.env.API_KEY;
  if (!key) return next(); // not configured -> open (OK for local dev only)
  if (req.header('x-api-key') === key) return next();
  res.status(401).json({ success: false, message: 'Invalid or missing API key' });
};
