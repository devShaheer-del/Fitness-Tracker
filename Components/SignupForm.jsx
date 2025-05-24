import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'profileImage') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('photo', formData.photo);

    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/Register', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        toast.success("User Registerd Successfully")
        // optionally redirect here
      } else {
        toast.error("User not Registerd");
      }
    } catch (err) {
      console.error(err);
      alert('Failed to register user');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your full name" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label">Profile Image</label>
            <input type="file" className="form-control" id="profileImage" accept="image/*" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="mt-3 mb-0 text-center text-muted">
          Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
