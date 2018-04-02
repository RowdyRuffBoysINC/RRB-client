import React from 'react';
import './about.css';
import code from '../assets/images/code-view.png';
import doc from '../assets/images/doc-view.png';
import whiteboard from '../assets/images/whiteboard-view.png';

export default function About(props) {
  return (
    <section id="about" className="about-container">
      <div className="about-text-section">
        <h1 className="about-header">About CrossShare</h1>
        <p className="about-text">Our App name is a collaborative tool that allows professionals, developers, and programmers of all kinds share documents in real time. </p>
      </div>
      <div className="about-img-section">
          <img className="about-img"   
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=500&q=60" alt="code editor" />
          <img className="about-img"  src="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=500&q=60"  alt="document editor" />
          <img className="about-img" src="https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b2d02a82b3f05412acd1ce347920e4f&auto=format&fit=crop&w=500&q=60" alt="whiteboard editor" />
      </div>
    </section>
  );
}
