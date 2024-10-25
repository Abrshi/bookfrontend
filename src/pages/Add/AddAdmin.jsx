import React, { useState } from 'react';
import axiosInstance from '../../api/axios';
import style from './Dipartment.module.css';

function AddAdmin() {
    const [email, setEmail] = useState('');      // Initialize as empty string
    const [position, setPosition] = useState(''); // Initialize as empty string

    const [signupSucssMsg, setSignupSucssMsg] = useState('');
    const [signupErrMsg, setSignupErrMsg] = useState('');

    const addnewadmin = async (e) => {
        e.preventDefault();

        // Make sure email and position are provided
        if (!email || !position) {
            setSignupErrMsg('Please provide both email and position.');
            return;
        }

        try {
            // Post request with JSON data
            const response = await axiosInstance.patch('/addadmin', { email, position });

            if (response.status === 200) {
                setSignupSucssMsg('Admin added successfully');
                setSignupErrMsg('');
                setEmail('');   // Clear input fields after success
                setPosition(''); 
            } else {
                setSignupSucssMsg('');
                setSignupErrMsg('Failed to add admin.');
            }
        } catch (error) {
            console.error('Error during adding admin:', error);
            setSignupSucssMsg('');
            setSignupErrMsg('Admin adding failed');
        }
    };

    return (
        <form onSubmit={addnewadmin}>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name='email'
                id='email'
                placeholder='Email'
                value={email}
            />
            <input
                onChange={(e) => setPosition(e.target.value)}
                type="text"
                name='position'
                placeholder='Admin Type'
                id='position'
                value={position}
            />
            <button className={style.button}>Add this admin</button>

            {signupSucssMsg && <p>{signupSucssMsg}</p>}
            {signupErrMsg && <p>{signupErrMsg}</p>}
        </form>
    );
}

export default AddAdmin;
