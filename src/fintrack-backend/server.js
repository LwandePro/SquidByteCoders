import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import goalsRoutes from "./routes/goals.js";
import financeRoutes from "./routes/finance.js";
import gamificationRoutes from "./routes/gamification.js";
import chatRoutes from "./routes/chat.js";
import historyRoutes from "./routes/history.js";




// Routes
app.use("/auth", authRoutes);
app.use("/goals", goalsRoutes);
app.use("/finance", financeRoutes);
app.use("/gamification", gamificationRoutes);
app.use("/chat", chatRoutes);
app.use("/history", historyRoutes);
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

// server.js
const app = express();
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const { createClient } = require('@supabase/supabase-js');



// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/* ================= AUTH ================= */

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  if (data.user) {
    await supabase.from('users').insert([{ user_id: data.user.id, name, email }]);
  }
  res.json({ message: 'Registration successful', user: data.user });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Login successful', session: data.session, user: data.user });
});

/* ================= GOALS ================= */
app.get('/goals/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('goals').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/goals', async (req, res) => {
  const { user_id, goal_name, target_amount, start_date, end_date } = req.body;
  const { data, error } = await supabase.from('goals').insert([
    { user_id, goal_name, target_amount, start_date, end_date }
  ]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: '🎯 Goal added', data });
});

/* ================= DASHBOARD ================= */
app.get('/dashboard/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });

  const income = transactions.filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const expenses = transactions.filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  res.json({
    income,
    expenses,
    balance: income - expenses,
    transactions
  });
});

/* ================= GAMIFICATION ================= */
app.get('/gamification/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('gamification').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

/* ================= HISTORY / UPLOAD ================= */
const upload = multer({ dest: 'uploads/' });

app.post('/upload/:user_id', upload.single('file'), async (req, res) => {
  const { user_id } = req.params;
  const file = req.file;

  // Store file info in Supabase (or just keep local)
  const { error } = await supabase.from('uploads').insert([
    { user_id, filename: file.originalname, path: file.path }
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: '📂 File uploaded', file: file.originalname });
});

app.get('/history/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('uploads').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

/* ================= EXPORTS ================= */

// Export summary as PDF
app.get('/export/pdf/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');
  doc.pipe(res);

  doc.fontSize(18).text('Financial Summary', { align: 'center' });
  doc.moveDown();

  data.forEach(t => {
    doc.fontSize(12).text(`${t.date} - ${t.type.toUpperCase()} - R${t.amount} - ${t.description}`);
  });

  doc.end();
});

// Export summary as CSV
app.get('/export/csv/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });

  const parser = new Parser();
  const csv = parser.parse(data);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=summary.csv');
  res.send(csv);
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
