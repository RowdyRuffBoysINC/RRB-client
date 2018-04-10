import React from 'react';
import { connect, } from 'react-redux';
import { Redirect, } from 'react-router-dom';
import Modal from './Modal.js';
import RegistrationForm from './Forms/RegistrationForm.js';
import About from './About.js';
import scroll from '../../assets/images/double-arrow.png';
import './LandingPage.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing-page">
      <Modal />
      <section id="header" className="container">
        <header>
          <h1 className="landing-header">
            <span className="header-one">Cross</span><span className="header-two">Share</span>
          </h1>
          <h2 className="landing-sub-header">
            Working remotely shouldnt feel remote
          </h2>
        </header>
        <footer>
          <a href="#about">
            <img src={scroll} className="scroll-icon" alt="scroll icon img" />
          </a>
        </footer>
      </section>
      <About />
      <section id="sign-up" className="container-about">
        <section className="about content">
          <RegistrationForm />
        </section>
      </section>
    </section>
  );
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(LandingPage);
