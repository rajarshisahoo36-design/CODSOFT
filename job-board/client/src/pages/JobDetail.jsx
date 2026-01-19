import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    // Basic fetch
    axios.get(`https://jobboard-api-92sr.onrender.com/api/v1/gigs/${id}`)
      .then(res => setJob(res.data.data))
      .catch(err => console.error("Job vanished?", err));
  }, [id]);

  const handleApply = async () => {
    if (!user) return alert("Please login first!");
    
    try {
      await axios.post(`https://jobboard-api-92sr.onrender.com/api/v1/gigs/${id}/apply`);
      setApplied(true);
      alert("Resume sent! Good luck.");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (!job) return <div>Scouring the database...</div>;

  return (
    <div className="job-detail-container">
      <div className="header-banner">
        <h1>{job.title}</h1>
        <span className="badge">{job.listingType}</span>
      </div>
      
      <div className="content-box">
        <h3>Overview</h3>
        <p>{job.description}</p>
        
        <div className="meta-data">
          <p><strong>Pay:</strong> {job.salaryRange}</p>
          <p><strong>Location:</strong> {job.location}</p>
        </div>

        {/* Logic: Only show Apply button if they haven't applied yet */}
        <div className="action-area">
          {applied ? (
             <button disabled className="btn-success">Application Sent ✓</button>
          ) : (
             <button onClick={handleApply} className="btn-primary">
               Apply Now
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;