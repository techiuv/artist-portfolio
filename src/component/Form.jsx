import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { firstName, secondName, email, message } = formData;

    if (!firstName || !secondName || !email || !message) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setFormData({ firstName: '', secondName: '', email: '', message: '' });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName" className="block font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label htmlFor="secondName" className="block font-medium">Second Name</label>
        <input
          type="text"
          name="secondName"
          value={formData.secondName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className={`w-full py-2 bg-blue-500 text-white rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
