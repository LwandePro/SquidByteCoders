import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get chat messages for a user
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Add a new chat message
router.post("/", async (req, res) => {
  const { user_id, message, role } = req.body; // role: user or bot
  const { data, error } = await supabase
    .from("chat_history")
    .insert([{ user_id, message, role }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
