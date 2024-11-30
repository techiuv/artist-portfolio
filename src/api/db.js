const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = db.connect[0].readyState === 1;
        console.log('DB connected');
    } catch (err) {
        console.error(err);

    }
}

module.exports = connectDB
