import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';

const Contact = () => {

  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [message, SetMessage] = useState('');


  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/v1/ContactUs/contact';
      const response = await axios.post(url, { name, email, message }, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success === true) {
        toast.success("Contact request Send");
      } else {
        toast.error("Request not send")
      }

    } catch (error) {

    }
  }


  return (
    <div className="contact-page d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <h2 className="text-center mb-5 animate__animated animate__fadeInDown text-primary fw-bold">
          Get in Touch With Us
        </h2>
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6 animate__animated animate__fadeInLeft">
            <div className="glass-card p-4 shadow-lg">
              <form>
                <div className="mb-4">
                  <label className="form-label">
                    <FaUser className="me-2" /> Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="John Doe"
                    required
                    name='name'
                    onChange={(e) => SetName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    <FaEnvelope className="me-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="example@mail.com"
                    required
                    name='email'
                    onChange={(e) => SetEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    <FaCommentDots className="me-2" /> Your Message
                  </label>
                  <textarea
                    rows="4"
                    className="form-control custom-input"
                    placeholder="Write your message here..."
                    required
                    name='message'
                    onChange={(e) => SetMessage(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" onClick={handleSubmite} className="btn btn-outline-primary w-100 mt-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="col-lg-6 animate__animated animate__fadeInRight">
            <div className="glass-card overflow-hidden map-wrapper shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.114368837958!2d-122.4194152846821!3d37.77492927975995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808ad61b8c1f%3A0x4e6dd8bfa08b138b!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1626186492453!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
