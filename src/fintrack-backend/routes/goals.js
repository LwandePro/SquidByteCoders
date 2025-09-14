import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get all goals
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase.from("goals").select("*").eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Add new goal
router.post("/", async (req, res) => {
  const { user_id, goal_name, target_amount, start_date, end_date } = req.body;
  const { data, error } = await supabase.from("goals").insert([{ user_id, goal_name, target_amount, start_date, end_date }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
