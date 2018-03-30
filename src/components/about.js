import React from 'react';
import { connect, } from 'react-redux';
import './about.css';

export default function About(props) {
  return (
    <section id="about" className="about-container">
      <div className="about-text-section">
      <h1 className="about-header">About Our App</h1>
      <p className="about-text">Detailed information describing our app</p>
      </div>
      <div className="about-img-section">
        <img className="about-img" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=1050&q=80" alt="code editor"/>
        <img className="about-img" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=1050&q=80" alt="code editor"/>
        <img className="about-img" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=1050&q=80" alt="code editor"/>
      </div>
    </section>
  );
}
