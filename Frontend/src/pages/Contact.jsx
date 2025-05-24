import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backend_url+"/api/contact", form);
      if (res.data.success) {
        setStatus("✅ Email sent successfully!");
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus("❌ Failed to send email.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error.");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mt-24 p-8 bg-white shadow-xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300"
          >
            Send Message
          </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
      </motion.div>
      <Footer />
    </>
  );
};

export default Contact;
