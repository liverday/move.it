import React from 'react';

import styles from '../../styles/components/Layout.module.css';

const Layout: React.FC = ({ children }) => {
  return (
      <div className={styles.container}>
          {children}
      </div>
  );
}

export default Layout;