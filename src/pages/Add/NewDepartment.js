import React, { useState } from 'react';
import style from './Dipartment.module.css';
import axiosInstance from '../../api/axios';

function NewDepartment() {
  const [dip, setDip] = useState('');
  const [signupSucssMsg, setSignupSucssMsg] = useState('');
  const [signupErrMsg, setSignupErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure department name is provided
    if (!dip) {
      setSignupErrMsg('Please provide department.');
      return;
    }

    try {
      // Post request with JSON data
      const response = await axiosInstance.post('/dipartment', { dipartment_name: dip });
      setSignupSucssMsg('Department added successfully');
      setSignupErrMsg('');
    } catch (error) {
      console.error('Error during upload:', error);
      setSignupSucssMsg('');
      setSignupErrMsg('Upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          onChange={(e) => setDip(e.target.value)}
          type="text"
          value={dip}
          name='dipartment'
          id='dipartment'
          required
        />
        <button className={style.button}>Add Department</button>
        {signupSucssMsg && <p>{signupSucssMsg}</p>}
        {signupErrMsg && <p>{signupErrMsg}</p>}
      </form>
     
    </div>
  );
}


export default NewDepartment;
