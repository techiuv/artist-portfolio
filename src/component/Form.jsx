import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '/backend/config/firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Save form data to Firebase Firestore
      const docRef = await addDoc(collection(db, 'formSubmissions'), data);
      console.log('Document written with ID: ', docRef.id);

      // Reset form fields
      reset();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] md:w-3/4 mx-auto p-4 bg-secondary-color rounded-3xl py-2 lg:py-4 my-11"
    >
      <h3 className="text-white text-center mt-4 mb-1 text-2xl lg:text-4xl font-bold">
        Get in Touch
      </h3>
      <p className="text-[#BDBDBD] text-center font-normal">You can reach me anytime</p>

      {/* First and Second Name */}
      <div className="py-3 lg:py-2 flex flex-col md:flex-row gap-4 md:gap-3 justify-between items-center w-[100%] lg:w-[85%] mx-auto">
        <input
          type="text"
          placeholder="First Name"
          {...register('firstName', { required: 'First Name is required' })}
          className="w-full md:w-[50%] border px-4 md:px-6 py-3 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

        <input
          type="text"
          placeholder="Second Name"
          {...register('secondName', { required: 'Second Name is required' })}
          className="w-full md:w-[50%] border px-4 md:px-6 py-3 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
        {errors.secondName && <p className="text-red-500">{errors.secondName.message}</p>}
      </div>

      {/* Email */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          })}
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div className="w-[100%] lg:w-[85%] mx-auto">
        <textarea
          placeholder="Your Message"
          {...register('message', { required: 'Message is required' })}
          rows={4}
          className="w-full border px-4 md:px-6 py-3 my-2 lg:py-2 rounded-3xl bg-transparent text-sm lg:text-xl border-primary-color placeholder:text-[#6F6969] text-white outline-none focus:bg-transparent"
        />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`px-3 mx-auto flex justify-center items-center py-2 my-3 bg-accent-color text-sm rounded-full w-[6rem] text-white ${
          isSubmitting && 'opacity-50 cursor-not-allowed'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-6 h-6 border-4 border-dotted border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default Form;
