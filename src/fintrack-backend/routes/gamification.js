import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get gamification progress
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from("gamification")
    .select("*")
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Update gamification progress (e.g., points, badges)
router.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const updates = req.body; // { points: x, badges: [...] }

  const { data, error } = await supabase
    .from("gamification")
    .update(updates)
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
