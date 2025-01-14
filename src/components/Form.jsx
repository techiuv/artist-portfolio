import { useState } from "react";
import { useForm } from "react-hook-form";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Submit form data to Firestore
  const submitFormData = async (data) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "formSubmissions"), data);
      // alert("Form submitted successfully!");
      setSuccess("Form submitted successfully!");
      reset();
    } catch (error) {
      // alert("Error submitting form. Please try again.");
      setError("Something went wrong . Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-[90%] md:w-3/4 mx-auto p-4 bg-secondary-color rounded-3xl py-2 lg:py-4 my-11"
      onSubmit={handleSubmit(submitFormData)}
    >
      <h3 className="text-white text-center mt-4 mb-1 text-2xl lg:text-4xl font-bold">
        Get in Touch
      </h3>
      <p className="text-[#BDBDBD] text-center font-normal">
        You can reach me anytime
      </p>

      {/* Name Inputs */}
      <div className="py-3 lg:py-2 flex flex-col md:flex-row gap-4 md:gap-3 justify-between items-center w-[100%] lg:w-[85%] mx-auto">
        <div className="flex flex-col w-full md:w-[50%]">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: "First Name is required" })}
            className={`w-full  border px-4 md:px-6 py-3 lg:py-3 rounded-3xl bg-transparent text-sm lg:text-[1rem] border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full md:w-[50%]">
          <input
            type="text"
            placeholder="Second Name"
            {...register("secondName", { required: "Second Name is required" })}
            className={`w-full  border px-4 md:px-6 py-3 lg:py-3 rounded-3xl bg-transparent text-sm lg:text-[1rem] border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent ${
              errors.secondName ? "border-red-500" : ""
            }`}
          />
          {errors.secondName && (
            <p className="text-red-500 text-sm">{errors.secondName.message}</p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
          className={`w-full border px-4 md:px-6 py-3 my-2 lg:py-3 rounded-3xl bg-transparent text-sm lg:text-[1rem] border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Message Input */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <textarea
          placeholder="Your Message"
          {...register("message", { required: "Message is required" })}
          rows={4}
          className={`w-full border px-4 md:px-6 py-3 my-2  rounded-3xl bg-transparent text-sm lg:text-[1rem] resize-none border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent ${
            errors.message ? "border-red-500" : ""
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`px-3 mx-auto flex justify-center items-center py-2 my-3 bg-accent-color text-sm rounded-full w-[6rem] text-white ${
          isSubmitting && "cursor-not-allowed"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-[3px] border-dotted border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>

      {success && <p className="text-green-500 text-sm">{success}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default Form;
