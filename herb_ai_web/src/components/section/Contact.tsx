'use client'

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import { style } from '@/src/utils/style';
const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [from, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({ ...from, [name]: value });
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send("service_ln9qag8",
      "template_wz9tvjj",
      {
        from_name: from.name,
        to_name: 'Chandan Kumar',
        from_email: from.email,
        to_mail: 'kumarnchandan05@gmial.com',
        message: from.message,
      },
      "KYfFXhFvS917vsVx_"
    ).then(() => {
      setLoading(false);
      alert('Thank you!. I will get back to you soon.');

      setForm({
        name: "",
        email: "",
        message: "",
      });
    }, (error) => {
      setLoading(false);
      console.error(error);
      alert('Something went wrong. Please try again.');
    })
  }

  return (
    <div className={`${style.paddingX} w-full h-full bg-tertiary flex flex-col justify-center items-center rounded-3xl shadow-2xl py-5`}>
      <div className='w-full h-full flex flex-col justify-center items-start'>
        <h2 className={`${style.sectionHeadText} text-primary/80`}>Contact Us</h2>
        <p className={`${style.sectionSubText} text-primary/60`}>For any inquiries or questions</p>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col justify-start items-start gap-8 bg-white/30 p-10 w-full rounded-2xl shadow-lg z-10"
      >
        <label className="flex flex-col w-full">
          <span className="text-primary font-medium mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={from.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className="py-4 px-6 bg-secondary text-primary rounded-lg outline-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col w-full">
          <span className="text-primary font-medium mb-4">Your Email</span>
          <input
            type="email"
            name="email"
            value={from.email}
            onChange={handleChange}
            placeholder="What's your email?"
            className="py-4 px-6 bg-secondary text-primary rounded-lg outline-none border-none font-medium"
          />
        </label>
        <label className="flex flex-col w-full">
          <span className="text-primary font-medium mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={from.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className="py-4 px-6 bg-secondary text-primary rounded-lg outline-none border-none font-medium"
          />
        </label>

        <button
          type="submit"
          className="bg-primary py-4 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  )
}

export default Contact