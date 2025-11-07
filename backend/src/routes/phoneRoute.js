import { Router } from "express";
import fetch from 'node-fetch';

const phoneRouter = Router();

phoneRouter.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;
  const username = process.env.ELKS_USERNAME;
  const password = process.env.ELKS_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const body = new URLSearchParams({ from: 'Contact', to, message });

  try {
    const response = await fetch('https://api.46elks.com/a1/sms', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    // Försök parse JSON, men fallback till text om det inte går
    let result;
    const text = await response.text();
    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text }; // returnera som text
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export { phoneRouter };
