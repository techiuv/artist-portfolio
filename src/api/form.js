const connectDB = require('./db');
const Form = require('./models/Form');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();
    const { firstName, secondName, email, message } = req.body;

    if (!firstName || !secondName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const form = new Form({ firstName, secondName, email, message });
      await form.save();
      return res.status(201).json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error saving form:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
