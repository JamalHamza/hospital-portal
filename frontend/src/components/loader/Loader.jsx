import React from 'react';
import ReactDOM from 'react-dom';
import loadingImg from '../../assets/loader.gif';
import './Loader.scss';
import './Spinner.css';

function Loader() {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loadingImg} alt='loading...' />
      </div>
    </div>,
    document.getElementById('loader')
  );
}

// export const Spinner = () => {
// return (
//   <div className='--center-all'>
//     <img src={loadingImg} alt='Loading...' />
//   </div>
// );
// };
export const Spinner = () => {
  return <span className='loader'></span>;
};

export default Loader;
