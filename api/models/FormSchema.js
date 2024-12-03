const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const FormData = mongoose.models.Form || mongoose.model('FormData', formSchema);

export default FormData; 
