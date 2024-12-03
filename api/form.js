import connectToDatabase from './db.js';
import FormData from './models/FormSchema.js';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const form = new Form({ firstName, lastName, email, message });
      await form.save();
      return res.status(201).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to submit form' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
