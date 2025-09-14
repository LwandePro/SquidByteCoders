import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get salary breakdown from documents
router.get("/salary/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from("documents").select("parsed_data").eq("user_id", user_id).eq("doc_type", "payslip");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get all transactions
router.get("/transactions/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from("transactions").select("*").eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
