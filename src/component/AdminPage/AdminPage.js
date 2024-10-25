import React, { useContext, useState } from 'react';
import styles from './AdminPage.module.css';
import Uplodes from '../../pages/Uplodes/Uplodes';
import Dipartment from '../../pages/Add/AddTings';
import UserManagment from '../../pages/UserManagment/UserManagment';
import NotAllowed from '../../pages/NotAllowed/NotAllowed';
import { AuthContext } from '../../auth/AuthContext';

const AdminPage = () => {
  const { user, role } = useContext(AuthContext);
  const [work, setWork] = useState(1);

  const chengWork = (type) => {
    setWork(type);
    console.log(type);
  };

  const renderComponent = () => {
    if (!user || role.role !== 'admin') {
      return <NotAllowed />;
    }

    switch (work) {
      case 1:
        return <Uplodes />;
      case 2:
        return <UserManagment />;
      case 3:
        return <Dipartment />;
        return null;
    }
  };

  return (
    <div className={styles.div}>
      <div className={styles.menu}>
        <ul className={styles.ul}>
          <li><button onClick={() => chengWork(1)}>Upload Material</button></li>
          <li><button onClick={() => chengWork(2)}>User Management</button></li>
          <li><button onClick={() => chengWork(3)}>Add </button></li>
        </ul>
      </div>

      {/* Render the selected component or NotAllowed message */}
      <div className={styles.renderComponent}>
      {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPage;
