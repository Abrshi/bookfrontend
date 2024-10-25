import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './UserManagment.module.css'; // Import the CSS module
import axiosInstance from '../../api/axios';

function UserManagment() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [nave , setNave] = useState('userlist')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Failed to load users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.user_id} className={styles.userContainer}>
            <div className={styles.userDetail}>
              {user.user_id}
            </div>
            <div className={styles.userDetail}>
              {user.username}
            </div>
            <div className={styles.userDetail}>
              {user.email}
            </div>
            <div className={styles.userDetail}>
              {user.behavior_score}
            </div>
            <div className={styles.userDetail}>
             {user.role}
            </div>
          </div>
        ))
      ) : (
        <p className={errorMessage ? styles.errorMessage : styles.noUsers}>
          {errorMessage || 'No users available.'}
        </p>
      )}
    </div>
  );
}

export default UserManagment;
