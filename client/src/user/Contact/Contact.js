import React, { useState } from 'react';
import Call from "./Images/Vector (1).png";
import Message from "./Images/Vector (2).png";

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (data.success) {
                alert('Message sent successfully!');
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                alert('Failed to send message: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex m-[50px]">
            <div className="w-[20%]">
                <div className="flex items-center">
                    <img src={Call} className="bg-black rounded-[100%] w-[30px]" alt="Call Icon" />
                    <span className="font-bold ml-2">Call to Us</span>
                </div>
                <p className="mt-[10px]">We are available 24/7, 7 days a week</p>
                <p className="mt-[10px] mb-[20px]">Phone: +251909551265</p>
                <hr></hr>
                <div className="flex items-center">
                    <img src={Message} className="bg-black rounded-[100%] w-[30px]" alt="Message Icon" />
                    <span className="font-bold ml-2">Write to Us</span>
                </div>
                <p className="mt-[10px]">Fill out our form and we will contact you within 24 hours</p>
                <p className="mt-[10px]">Emails: Kidusm3l@gmail.com</p>
                <p className="mt-[10px]">Emails: Abdullahfarid@gmail.com</p>
            </div>
            <div className="w-[80%]">
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="mx-[20px] w-[33%] p-[10px] bg-gray-200 rounded-[5px] focus:outline-none"
                        />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="mx-[20px] w-[33%] p-[5px] bg-gray-200 rounded-[5px] focus:outline-none"
                        />
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Your Phone"
                            className="mx-[20px] w-[33%] p-[5px] bg-gray-200 rounded-[5px] focus:outline-none"
                        />
                    </div>
                    <div className="mx-[20px] mt-[30px] h-[100%]">
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="bg-gray-200 rounded-[10px] w-[100%] h-[100%] p-[10px] focus:outline-none"
                            placeholder="Your message here"
                        />
                    </div>
                    <button type="submit" className="bg-green-400 rounded-[5px] p-[10px] m-[20px]">Send Message</button>
                </form>
            </div>
        </div>
    );
}
