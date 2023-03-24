import React from 'react';
import Header from '../Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='--pad' style={{ minHeight: '90vh' }}>
        {children}
      </div>
    </>
  );
}

export default Layout;
