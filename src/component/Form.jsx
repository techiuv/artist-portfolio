import React, { useState } from "react";
import { db } from "/backend/config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = async (data) => {
    try {
      await addDoc(collection(db, "formSubmissions"), data);
      return { success: true };
    } catch (error) {
      console.error("Error submitting form data:", error);
      return { success: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("All fields are required.");
      setLoading(false);
      return;
    }

    const response = await submitFormData(formData);
    if (response.success) {
      setStatus("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Error submitting form. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form
      className="w-[90%] md:w-3/4 mx-auto p-4 bg-secondary-color rounded-3xl py-2 lg:py-4 my-11"
      onSubmit={handleSubmit}
    >
      <h3 className="text-white text-center mt-4 mb-1 text-2xl lg:text-4xl font-bold">
        Get in Touch
      </h3>
      <p className="text-[#BDBDBD] text-center font-normal">
        You can reach me anytime
      </p>

      {/* Name */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
      </div>

      {/* Email */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
      </div>

      {/* Message */}
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

      {/* Status */}
      {status && <p className="text-center text-sm my-2 text-white">{status}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className={`px-3 mx-auto flex justify-center items-center py-2 my-3 bg-accent-color text-sm rounded-full w-[6rem] text-white ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-dotted border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default Form;
