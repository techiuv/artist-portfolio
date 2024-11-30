const connectDB = require('./db')
const Form = require('./models/Form')

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await connectDB()
        const { firstName, secondName, email, phone, message } = req.body

        if (!firstName || !secondName || !email || !phone || !message) {
            return res.status(400).json({ message: 'Please fill in all fields.' })

        }


        try {
            const form = new Form({ firstName, secondName, email, message })
            await form.save()
            res.status(201).json({ message: 'Form submitted successfully.' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Error submitting form.' })

        }
    } else {
        res.status(400).json({ message: 'Invalid request method.' })
    }
}