const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
const PORT = process.env.PORT || 4000;
function reply(raw) {
  const s = String(raw || '').toLowerCase();
  if (!s.trim()) return 'Please share a little about what is on your mind.';
  if (/suicid|kill myself|end my life|want to die|hurt myself|self.harm/.test(s)) return "I'm really sorry you're going through this. Your safety matters. If you may act on these thoughts, move near someone you trust and contact emergency help now (India: 112). You can also contact Tele-MANAS at 14416.";
  if (/anxious|anxiety|panic|nervous|scared|overwhelm/.test(s)) return "That sounds uncomfortable. Try breathing in gently for 4 counts and out for 6. What is the main thing making you feel anxious right now?";
  if (/stress|pressure|workload|exam|deadline/.test(s)) return "It sounds like a lot is on your shoulders. What feels most urgent, and what is one small step you could take in the next 10 minutes?";
  if (/sad|depress|low|cry|upset|heartbroken/.test(s)) return "I'm sorry things feel heavy. Would you like to tell me what happened, or has this feeling been building for a while?";
  if (/lonely|alone|nobody/.test(s)) return "Feeling alone can be painful. Is there someone you feel comfortable messaging today?";
  if (/sleep|insomnia|overthink/.test(s)) return "A busy mind can make rest difficult. Try relaxing your shoulders and writing down your thoughts. What usually keeps your mind active at night?";
  if (/thank/.test(s)) return "You're welcome. Thank you for sharing with me. Be gentle with yourself today. 💙";
  if (/hello|hi|hey/.test(s)) return "Hello! I'm glad you stopped by. How are you feeling today?";
  return "Thank you for telling me. I want to understand rather than assume. Could you share a little more about what happened?";
}
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'MindEase REST API' }));
app.post('/api/chat', (req, res) => {
  const message = req.body && req.body.message;
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'message must be a non-empty string' });
  return res.json({ reply: reply(message), timestamp: new Date().toISOString() });
});
app.listen(PORT, () => console.log(`MindEase API listening on http://localhost:${PORT}`));
