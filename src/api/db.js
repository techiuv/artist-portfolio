const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


let isConnected = false

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect("mongodb+srv://mailyuvraj0317:EtlUb1RLLKq0zj0Q@formdata.ie7e9.mongodb.net/?retryWrites=true&w=majority&appName=FormData", {
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
