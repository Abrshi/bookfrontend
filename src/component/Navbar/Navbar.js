import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

const Navbar = () => {
  const { user, role, logout ,login} = useContext(AuthContext);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>CS Resources</div>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li>{user && role.role === 'admin' ? <Link to="/admin">Admin</Link> : ''}</li>
          <li className={styles.profileContainer}>
            <div className={styles.profile}>
              {user ? (
                <>
                  <button onClick={logout}>{user.username}<br />Logout</button>
                </>
              ) : (
              ''
              )}
            </div>
            
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
