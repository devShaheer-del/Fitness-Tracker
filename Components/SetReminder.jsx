import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const SetReminder = () => {
  const [reminderType, setReminderType] = useState('Workout');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const socket = useRef(null);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://f-backend-eight.vercel.app/api/v1/reminder/getreminder',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setReminders(response.data.reminders);
      } else {
        setMessage('Failed to fetch reminders.');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error fetching reminders');
    }
  };

  useEffect(() => {
    fetchReminders();

    if (!socket.current) {
      socket.current = io('http://localhost:8080'); // backend port
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    socket.current.on('reminder', (data) => {
      const userId = localStorage.getItem('userId');
      if (data.userId === userId) {
        new Notification(`🔔 ${data.type} Reminder`, {
          body: `Scheduled on ${data.date} at ${data.time}`,
        });
      }
    });

    return () => {
      if (socket.current) {
        socket.current.off('reminder');
      }
    };
  }, []);

  const handleAddReminder = async () => {
    if (!date || !time) {
      setMessage('Date and Time are required.');
      return;
    }

    const newReminder = {
      type: reminderType,
      date,
      time,
    };

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/v1/reminder/SetReminder',
        newReminder,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setMessage('Reminder created successfully!');
        setDate('');
        setTime('');
        setReminderType('Workout');
        fetchReminders();
      } else {
        setMessage('Failed to create reminder.');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Server error');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Set Reminder</h2>

          {message && <div className="alert alert-info">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Reminder Type</label>
            <select
              className="form-select"
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value)}
            >
              <option value="Workout">Workout</option>
              <option value="Meal">Meal</option>
              <option value="Fitness Check">Fitness Check</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleAddReminder}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add Reminder'}
          </button>

          <h4 className="mt-5 mb-3">My Reminders</h4>
          {reminders.length === 0 ? (
            <p className="text-muted">No reminders set yet.</p>
          ) : (
            <div className="row">
              {reminders.map((reminder, index) => {
                const combinedDateTime = new Date(
                  `${reminder.date}T${reminder.time}`
                );
                return (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">
                          <span className="badge bg-primary">{reminder.type}</span>
                        </h5>
                        <p className="card-text mb-1">
                          <strong>Date:</strong>{' '}
                          {combinedDateTime.toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          <strong>Time:</strong>{' '}
                          {combinedDateTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetReminder;
