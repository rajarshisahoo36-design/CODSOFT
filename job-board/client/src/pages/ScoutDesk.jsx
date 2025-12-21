import { useState } from 'react';
import axios from 'axios';

const ScoutDesk = () => {
  const [formData, setFormData] = useState({ title: '', description: '', location: '', salaryRange: '' });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://jobboard-api-92sr.onrender.com/api/v1/gigs', formData);
      alert('Mission Posted Successfully!');
      setFormData({ title: '', description: '', location: '', salaryRange: '' });
    } catch (err) {
      alert('Failed. Are you logged in?');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem' }}>Scout Dashboard</h1>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Deploy a new mission for agents to accept.</p>
        
        <form onSubmit={handlePost}>
          <div className="form-group">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Job Title</label>
            <input name="title" value={formData.title} onChange={handleChange} className="form-input" placeholder="e.g. Senior React Developer" required />
          </div>
          
          <div className="grid-cols-2" style={{ marginBottom: '1rem' }}>
            <div>
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Location</label>
               <input name="location" value={formData.location} onChange={handleChange} className="form-input" placeholder="e.g. Remote" />
            </div>
            <div>
               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Salary Range</label>
               <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} className="form-input" placeholder="e.g. $50k - $80k" />
            </div>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea" rows="5" placeholder="Describe the mission requirements..." required />
          </div>

          <button type="submit" className="btn btn-primary">Publish Mission</button>
        </form>
      </div>
    </div>
  );
};

export default ScoutDesk;