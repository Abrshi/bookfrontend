import React, { useContext } from 'react';
import styles from './HomePage.module.css';
import AuthForm from '../../auth/AuthForm';
import { AuthContext } from '../../auth/AuthContext';
import Files from '../../component/Files/Files';
const HomePage = () => {
  
  const { user} = useContext(AuthContext);
  return (
    <div className={styles.container}>
      
      
      { user?<Files/>:<AuthForm/>}
       
     
    </div>
  );
};

export default HomePage;
