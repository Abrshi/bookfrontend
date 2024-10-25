import React from 'react'
import NewDepartment from './NewDepartment'
import AddAdmin from './AddAdmin'
import style from './Dipartment.module.css'

function AddTings() {
  return (
    <div className={style.divs}>
      <div><NewDepartment/></div>
      <div><AddAdmin/></div>
    </div>
  )
}

export default AddTings