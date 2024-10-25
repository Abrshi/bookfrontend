import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import styles from './Uplodes.module.css';
import { AuthContext } from '../../auth/AuthContext';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [signupSucssMsg, setSignupSucssMsg] = useState('');
  const [selectedDipartment, setSelectedDipartment] = useState('');
  const [dipartments, setDipartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

const username=user.username
console.log(username);
  // Fetch department list
  useEffect(() => {
    const fetchDipartments = async () => {
      try {
        const response = await axiosInstance.get('/dipartments');
        setDipartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setSignupSucssMsg('Failed to fetch departments. Please try again later.');
      }
    };
    fetchDipartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setSignupSucssMsg('Please provide a file.');
      return;
    }

    // Prepare data as a plain object
    const data = new FormData();
    data.append('file', file); // Append file to FormData
    data.append('selectedDipartment', selectedDipartment);
    data.append('user', username);

    setIsLoading(true);

    try {
      // Send as FormData
      const response = await axiosInstance.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      setSignupSucssMsg('Upload success');
    } catch (error) {
      console.error('Error during upload:', error);
      setSignupSucssMsg('Upload failed: ' + (error.response?.data?.message || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDipartmentChange = (e) => {
    setSelectedDipartment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.formGroup}>
      <select
        value={selectedDipartment}
        onChange={handleDipartmentChange}
        className={styles.select}
        required
      >
        <option value="">Select a department</option>
        {dipartments.map((dip) => (
          <option key={dip.id} value={dip.department_name}>
            {dip.department_name}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor="file">Upload File</label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={`${styles.input} ${styles.inputFocus}`}
        required
      />
    </div>

    <button
      type="submit"
      className={`${styles.button} ${styles.buttonHover} ${styles.buttonActive}`}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? 'Uploading...' : 'Upload'}
    </button>

    {signupSucssMsg && <p>{signupSucssMsg}</p>}
  </form>
  );
};

export default UploadForm;