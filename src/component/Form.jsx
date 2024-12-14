import React, { useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ToastNotification from './ToastNotification';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");  // Status message for errors/success
  const [loading, setLoading] = useState(false);  // Loading state for submit button

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to Firestore
  const submitFormData = async (data) => {
    try {
      await addDoc(collection(db, "formSubmissions"), data);  // Submit data to Firestore
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");  
    setLoading(true);  

    const { firstName, secondName, email, message } = formData;

    // Check if all fields are filled
    if (!firstName || !secondName || !email || !message) {
      setStatus("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await submitFormData(formData);

      if (response.success) {
        setStatus("Form submitted successfully!");  
        setFormData({ firstName: "", secondName: "", email: "", message: "" });  // Clear form
      } else {
        setStatus("Error submitting form. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);   
    }
  };

  return (
    <form
      className="w-[90%] md:w-3/4 mx-auto p-4 bg-secondary-color rounded-3xl py-2 lg:py-4 my-11"
      onSubmit={handleSubmit}
    >
      <h3 className="text-white text-center mt-4 mb-1 text-2xl lg:text-4xl font-bold">
        Get in Touch
      </h3>
      <p className="text-[#BDBDBD] text-center font-normal">You can reach me anytime</p>

      {/* Name Inputs */}
      <div className="py-3 lg:py-2 flex flex-col md:flex-row gap-4 md:gap-3 justify-between items-center w-[100%] lg:w-[85%] mx-auto">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off"
          className="w-full md:w-[50%] border px-4 md:px-6 py-3 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
        <input
          type="text"
          name="secondName"
          placeholder="Second Name"
          value={formData.secondName}
          onChange={handleChange}
          autoComplete="off"
          className="w-full md:w-[50%] border px-4 md:px-6 py-3 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
      </div>

      {/* Email Input */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
      </div>

      {/* Message Input */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
      </div>

      {/* Show Toast Notification */}
        {status && (
          <ToastNotification
            message={status}
            type={status.includes('success') ? 'success' : 'error'}
            onClose={() => setStatus('')}
          />
        )}

      
      {/* Submit Button */}
      <button
        type="submit"
        className={`px-3 mx-auto flex justify-center items-center py-2 my-3 bg-accent-color text-sm rounded-full w-[6rem] text-white ${loading && " cursor-not-allowed"}`}
        disabled={loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-4 border-dotted border-t-transparent border-white rounded-full animate-spin"></div> 
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default Form;
