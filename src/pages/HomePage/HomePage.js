import React, { useContext } from 'react';
import styles from './HomePage.module.css';
import AuthForm from '../../auth/AuthForm';
import { AuthContext } from '../../auth/AuthContext';
import Files from '../../component/Files/Files';
const HomePage = () => {
  
  const { user} = useContext(AuthContext);
  return (
    <div className={styles.container}>
      
      <main className={styles.mainContent}>
        <h1>Welcome to the CS Resources Portal</h1>
        <p>Find all the study materials and resources you need for your Computer Science degree.</p>
      </main>

      { user?<Files/>:<AuthForm/>}
       
     
    </div>
  );
};

export default HomePage;
