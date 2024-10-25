import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import styles from './Files.module.css';
import axiosInstance from '../../api/axios';

function Files() {
  const [materials, setMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axiosInstance.get('/materials');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setErrorMessage('Failed to load materials. Please try again later.');
      }
    };

    fetchMaterials();
  }, []);

  return (
      <div className={styles.firstDiv}>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {materials.length > 0 ? (
        materials.map((material) => (
          <div key={material.id} className={styles.fileContainer}>
            <h2>{material.material_title}</h2>
            <div className={styles.fileDetails}>
              <div className={styles.detailItem}>
                <strong>File Type : </strong> <span>{material.file_type || ' Unknown'}</span>
              </div>
              <div className={styles.detailItem}>
                <strong>Download File:</strong>{' '}
                <a href={material.file_path} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                  Download PDF
                </a>
              </div>
            </div>
            
          </div>
        ))
      ) : (
        <p>No materials available.</p>
      )}
    </div>
   
  );
}

export default Files;
