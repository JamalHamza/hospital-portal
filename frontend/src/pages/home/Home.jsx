import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import loginImg from '../../assets/Home.png'
import './Home.scss'

function Home() {
  return (
    <div>
      <section className='container hero'>
        <div className='hero-text'>
          <h2>HEALTH PORTAL</h2>
          <p>Instant appointment with doctors.Guaranteed.</p>
          <p>
            100% Safe Consultations Be assured that your online consultation
            will be fully private and secured.
          </p>
          <div className='hero-buttons --flex-start'>
            <button className='--btn --btn-danger'>
              <Link to='/register'>Register</Link>
            </button>
            <button className='--btn --btn-primary'>
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>

        <div className='hero-image'>
          <img src={loginImg} alt='Auth' width={100} />
        </div>
      </section>
    </div>
  );
}

export default Home;
