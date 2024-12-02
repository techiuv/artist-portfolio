import mongoose from 'mongoose';
import Form from './models/Form.js';
import dbConnect from './db.js';

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === 'POST') {
      const { firstName, lastName, email, message } = req.body;

      if (!firstName || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const form = new Form({ firstName, lastName, email, message });
      await form.save();
      return res.status(201).json({ success: true, message: 'Form submitted' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
