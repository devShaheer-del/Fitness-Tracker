import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null); // required for PUT request

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name || '');
      setEmail(user.email || '');
      setImagePreview(user.profile || '');
      setUserId(user._id); // assuming _id is stored
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (imageFile) formData.append('photo', imageFile);

      const { data } = await axios.put(`https://f-backend-eight.vercel.app/api/v1/auth/UpdateProfile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      localStorage.setItem('User', JSON.stringify(data.updatedUser));

    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card shadow rounded-4 border-0">
            <div className="card-body px-5 py-4">
              <h3 className="text-center mb-4 fw-bold text-primary">Update Your Profile</h3>

              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="rounded-circle border border-3 border-primary-subtle shadow"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password (optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
