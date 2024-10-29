import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import styles from '../Files/Files.module.css';
import axiosInstance from '../../api/axios';
import { AuthContext } from '../../auth/AuthContext';

function Files() {
    const { id } = useContext(AuthContext); // Get user ID from AuthContext
    const [favoritesErr, setFavoritesErr] = useState('');
    const [favorites, setFavorites] = useState('');
    

    const [materials, setMaterials] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                // Fetch materials added to favorites by the specific user
                const response = await axiosInstance.get(`/materials/favorites/${id.id}`);
                setMaterials(response.data);
            } catch (error) {
                console.error('Error fetching materials:', error);
                setErrorMessage('Failed to load materials. Please try again later.');
            }
        };

        fetchMaterials();
    }, [id,favorites]); // Fetch materials when the component mounts or when id changes
    
    const removeFavorite = async (mid, uid) => {
      console.log(mid.material_id, uid.id);
    
      try {
        // Send a DELETE request with the user_id and material_id as parameters
        const response = await axiosInstance.delete(`/favorites`, {
          data: {
            material_id: mid.material_id,
            user_id: uid.id,
          },
        });
    
        // Check for a successful response
        if (response.status === 200) {
          const successMessage = 'Favorites removed successfully';
          setFavorites(successMessage);
          setFavoritesErr('');
    
          setTimeout(() => {
            setFavorites(''); // Clear the message after 3 seconds
          }, 3000);
        }
      } catch (error) {
        const errorMessage = 'Failed to remove from favorites';
        setFavorites('');
        setFavoritesErr(errorMessage);
    
        setTimeout(() => {
          setFavoritesErr(''); // Clear the error message after 3 seconds
        }, 3000);
      }
    };
    


    return (
        <div className={styles.firstDiv}>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {materials.length > 0 ? (
                materials.map((material) => (
                    <div key={material.material_id} className={styles.fileContainer}>
                        <h2>{material.material_title}</h2>
                        <div className={styles.fileDetails}>
                            <div className={styles.detailItem}>
                                <strong>File Type: </strong>
                                <span>{material.file_type || 'Unknown'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <a 
                                    href={material.file_path} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={styles.favoriteButton}
                                >
                                    Download PDF
                                </a>

                                <button onClick={() => removeFavorite(material, id)} className={styles.favoriteButton}>
                       Remove from feverite
                          </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No materials available.</p>
            )}

<div
  className={`${styles.addtofevdiv} ${favorites ? styles.success : favoritesErr ? styles.error : ''}`}
>
  {favorites || favoritesErr || ''}
</div>

        </div>
    );
}

export default Files;
