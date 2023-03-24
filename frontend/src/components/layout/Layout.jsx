import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='--pad' style={{ minHeight: '90vh' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
