import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../api/axios';

const CourseListPage = () => {
    const [materials, setMaterials] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch materials on component mount
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
        <div>
            <h2>Uploaded Materials</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <ul>
                {materials.map((material) => (
                    <li key={material.id}>
                        <h3>{material.material_title}</h3>
                        <p>Uploaded by: {material.uploaded_by}</p>
                        <p>Upload Date: {new Date(material.upload_date).toLocaleString()}</p>
                        <a href={material.file_path} target="_blank" rel="noopener noreferrer">View File</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseListPage;
