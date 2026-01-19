import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/" className="nav-brand">
          CODSOFT<span style={{ color: '#007bff' }}>.IO</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/board" className="nav-link">Find Work</Link>
        
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>Logout</button>
          </>
        ) : (
          <Link to="/auth" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;