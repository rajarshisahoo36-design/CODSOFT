import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GigCard from '../components/GigCard';

const LandingZone = () => {
  const [featuredGigs, setFeaturedGigs] = useState([]);

  // Fetching only a few gigs for the "Featured" section
  // Unconventional Logic: We re-use the search endpoint but slice the results client-side
  // or (better) we could add a ?limit=3 param to the backend later.
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('https://jobboard-api-92sr.onrender.com/api/v1/gigs/search');
        // Just taking the top 3 latest ones
        setFeaturedGigs(res.data.data.slice(0, 3));
      } catch (err) {
        console.error("Radar is down, couldn't fetch featured gigs.");
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-banner" style={{
        textAlign: 'center',
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '0 0 50% 50% / 40px' // Unique curve at bottom
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#2c3e50' }}>
          Deploy to your next <span style={{ color: '#007bff' }}>Mission</span>.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto 30px' }}>
          The specialized job board for elite developers and creative scouts. 
          Stop searching, start deploying.
        </p>
        <div className="cta-group">
          <Link to="/board" style={{
            textDecoration: 'none',
            background: '#007bff',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '25px',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>
            Browse Operations
          </Link>
          <Link to="/auth" style={{
            textDecoration: 'none',
            background: 'white',
            color: '#007bff',
            padding: '12px 30px',
            borderRadius: '25px',
            fontWeight: 'bold',
            border: '2px solid #007bff'
          }}>
            Join the Ranks
          </Link>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-section" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ borderLeft: '5px solid #007bff', paddingLeft: '15px', marginBottom: '25px' }}>
          Intel: Fresh Opportunities
        </h2>
        
        <div className="featured-grid">
          {featuredGigs.length > 0 ? (
            featuredGigs.map(gig => <GigCard key={gig._id} data={gig} />)
          ) : (
            <p>Scanning for signals...</p>
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/board" style={{ color: '#555', fontWeight: 'bold' }}>
            View all incoming signals &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingZone;