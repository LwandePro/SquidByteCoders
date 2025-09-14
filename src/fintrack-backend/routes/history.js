import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get timeline events
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  // Fetch transactions
  const { data: transactions, error: transError } = await supabase
    .from("transactions")
    .select("id, transaction_type, amount, created_at")
    .eq("user_id", user_id);

  if (transError) return res.status(400).json({ error: transError.message });

  // Fetch goals
  const { data: goals, error: goalsError } = await supabase
    .from("goals")
    .select("id, goal_name, target_amount, created_at")
    .eq("user_id", user_id);

  if (goalsError) return res.status(400).json({ error: goalsError.message });

  // Fetch chat history (optional)
  const { data: chat, error: chatError } = await supabase
    .from("chat_history")
    .select("id, message, role, created_at")
    .eq("user_id", user_id);

  if (chatError) return res.status(400).json({ error: chatError.message });

  // Combine & sort by date
  const timeline = [...transactions, ...goals, ...chat].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  res.json(timeline);
});

export default router;
