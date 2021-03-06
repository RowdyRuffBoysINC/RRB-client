import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-container">
      <section className="about-text-section">
        <h1 className="about-header">About CrossShare</h1>
        <p className="about-text">CrossShare is a collaborative tool that enables professionals, developers, and peers to share and edit documents in real time. CrossShare provides a code editor, doc editor, and whiteboard to give users full customization on how they work together.</p>
      </section>
      <section className="about-img-section">
        <img className="about-img"
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=500&q=60"
          alt="code editor"
        />
        <img className="about-img"
          src="https://images.unsplash.com/photo-1494707924465-e1426acb48cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7cac606b3752d340f2c342f32536727&auto=format&fit=crop&w=500&q=60"
          alt="document editor"
        />
        <img className="about-img"
          src="https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b2d02a82b3f05412acd1ce347920e4f&auto=format&fit=crop&w=500&q=60"
          alt="whiteboard editor"
        />
      </section>
    </section>
  );
}
