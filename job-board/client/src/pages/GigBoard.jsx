import { useState, useEffect } from 'react';
import axios from 'axios';
import GigCard from '../components/GigCard';

const GigBoard = () => {
  const [gigs, setGigs] = useState([]);
  
  useEffect(() => {
    axios.get('https://jobboard-api-92sr.onrender.com/api/v1/gigs/search')
      .then(res => setGigs(res.data.data))
      .catch(err => console.log("Backend offline"));
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Active Missions</h1>
        <p className="text-muted">Find your next deployment.</p>
      </div>
      
      <div className="grid-cols-2">
        {gigs.length === 0 ? <p className="text-center">Scanning for signals... (No jobs found)</p> : null}
        {gigs.map(gig => <GigCard key={gig._id} data={gig} />)}
      </div>
    </div>
  );
};

export default GigBoard;