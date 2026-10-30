const Student = require('../models/Student');

// Only allow these fields from the request body (prevents mass-assignment)
const ALLOWED = ['name', 'email', 'rollNumber', 'course', 'year', 'phone', 'isActive'];
const pick = (body = {}) =>
  ALLOWED.reduce((acc, k) => (body[k] !== undefined ? { ...acc, [k]: body[k] } : acc), {});

// POST /api/students
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(pick(req.body));
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// GET /api/students?page=1&limit=10&search=john&course=CS
exports.getStudents = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const filter = {};

    if (req.query.course) filter.course = String(req.query.course);
    if (req.query.search) {
      // escape regex special chars so user input can't break the query
      const s = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rx = new RegExp(s, 'i');
      filter.$or = [{ name: rx }, { email: rx }, { rollNumber: rx }];
    }

    const [students, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Student.countDocuments(filter),
    ]);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/:id
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/:id
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/students/:id
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    next(err);
  }
};
