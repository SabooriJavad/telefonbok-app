import { Router } from "express";
import fetch from "node-fetch";
import { ContactModel } from "../models/contact-model.js";

export const phoneRouter = Router();

// SEND SMS using only contactId + message
phoneRouter.post("/send-sms", async (req, res) => {
  try {
    const { contactId, message } = req.body;

    if (!contactId || !message) {
      return res.status(400).json({ error: "contactId and message are required." });
    }

    // 1. Fetch contact from database
    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    // Use ONLY the phone from your own DB
    const to = contact.phone;

    const username = process.env.ELKS_USERNAME;
    const password = process.env.ELKS_PASSWORD;
    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    // 2. Prepare SMS body
    const body = new URLSearchParams({
      from: "Contact",
      to,
      message,
    });

    // 3. Send SMS
    const response = await fetch("https://api.46elks.com/a1/sms", {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const text = await response.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text };
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
