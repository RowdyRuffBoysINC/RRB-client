import React from 'react';
import { connect, } from 'react-redux';
import './about.css';

export default function About(props) {
  return (
    <section className="about-container">
      <div className="about-text-section">
      <h1>About Our App</h1>
      <p>Detailed information describing our app</p>
      </div>
      <div className="about-img-section">
      </div>
    </section>
  );
}
