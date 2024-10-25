import React from 'react'
import styles from './NotAllowed.module.css';
function NotAllowed() {
  return (
    <div className={styles.container}> 
         <p className={styles.message}>
          You are not allowed to perform this action because you are not an admin.
        </p>
    </div>
  )
}

export default NotAllowed