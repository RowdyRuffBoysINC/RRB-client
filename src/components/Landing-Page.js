import React from 'react';
import { connect, } from 'react-redux';
import { Redirect, } from 'react-router-dom';

import Modal from './modal.js';
import RegistrationForm from './registration-form.js';
import About from './about.js';
import scroll from '../assets/images/double-arrow.png';
import './landing-page.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing-page">
      <Modal />
      <section id="header" className="container">
        <div className="content">
          <header>
            <h1 className="landing-header">
              CrossShare
            </h1>
            <h2 className="landing-sub-header">
              Working remotely shouldnt FEEL remote.
            </h2>
          </header>
          <footer>
            <a href="#about">
              <img src={scroll} className="scroll-icon" />
            </a>
          </footer>
        </div>
      </section>
      <About />
      <section id="sign-up" className="container">
        <div className="about content">
          <RegistrationForm />
          <header>
          </header>
          <footer>
            {/* Add image inside link to click to the next page  */}
          </footer>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(LandingPage);
