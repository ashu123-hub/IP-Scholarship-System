const express = require('express');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());   // Parse JSON request bodies
app.use(logger);           // Custom logging middleware

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/scholarships', scholarshipRoutes);

// ─── Root Endpoint ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Scholarship Application System API',
    version: '1.0.0',
    endpoints: {
      apply:       'POST   /scholarships/apply',
      getAll:      'GET    /scholarships',
      getById:     'GET    /scholarships/:id',
      verify:      'PUT    /scholarships/verify/:id',
      update:      'PUT    /scholarships/:id',
      delete:      'DELETE /scholarships/:id',
    }
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Scholarship API Server running at http://localhost:${PORT}`);
  console.log(`📋 Base URL: http://localhost:${PORT}/scholarships`);
});
