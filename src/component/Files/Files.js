import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import styles from './Files.module.css';
import axiosInstance from '../../api/axios';
import { AuthContext } from '../../auth/AuthContext';
import { FaFileDownload } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
function Files() {

  const {id } = useContext(AuthContext);

  const [materials, setMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [department, setDepartment] = useState('');
  const [dipartmentslist,setDipartmentslist] =useState('')
  console.log(department);
  
  useEffect(() => {
    const fetchMaterials = async () => {
        try {
            const response = await axiosInstance.get(`/materials?department=${department}`);
            setMaterials(response.data);
        } catch (error) {
            console.error('Error fetching materials:', error);
            setErrorMessage('Failed to load materials. Please try again later.');
        }
    };

    fetchMaterials();
}, [department]);

// department********************
useEffect(() => {
  const fetchDipartment = async () => {
    try {
      const response = await axiosInstance.get('/dipartments');
      setDipartmentslist(response.data);
    } catch (error) {
      console.error('Error fetching dipartments:', error);
    }
  };

  fetchDipartment();
}, []);
// console.log(dipartmentslist);
// /////////////////////////////add to feverite

const [favoritesErr , setFavoritesErr]=useState('')
const [favorites , setFavorites]=useState('')

const addToFavorite = async (mid, uid) => {
  console.log(mid.material_id, uid.id);

  try {
    // Post request with JSON data
    const response = await axiosInstance.post('/favorites', { material_id: mid.material_id, user_id: uid.id });
    
    const successMessage = 'Favorites added successfully';
    setFavorites(successMessage);
    setFavoritesErr('');

    
    setTimeout(() => {
      setFavorites(''); // Clear the message after 3 seconds
    }, 3000);
  } catch (error) {
    console.error('Error during upload:', error);
    
    const errorMessage = 'Failed to add to favorites';
    setFavorites('');
    setFavoritesErr(errorMessage);

    

    setTimeout(() => {
      setFavoritesErr(''); // Clear the error message after 3 seconds
    }, 3000);
  }
};


// 

return (
    <>
    <div className={styles.dipartments}>
    <h2>Select a Department</h2>
    {dipartmentslist.length > 0 ? (
      <ul className={styles.dipartmentsList}>
        {dipartmentslist.map((dep) => (
          <li key={dep.department_id} onClick={() => setDepartment(dep.department_id)}>
            {dep.department_name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No departments available.</p>
    )}


  </div>
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
                <a href={material.file_path} target="_blank" rel="noopener noreferrer" className={`${styles.favoriteButton} dounload`}>
                <FaFileDownload />
                </a>
                <button onClick={() => addToFavorite(material, id)} className={`${styles.favoriteButton} favorite`}>
                <MdBookmarkAdded />
                          </button>

                   </div>
            </div>
         
          </div>
        ))
      ) : (
        <p>No materials available.</p>
      )}
    </div>
    <div
  className={`${styles.addtofevdiv} ${favorites ? styles.success : favoritesErr ? styles.error : ''}`}
>
  {favorites || favoritesErr || ''}
</div>

    </>
   
  );
}

export default Files;
