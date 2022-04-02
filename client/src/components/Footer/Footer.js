import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray">
      <ul className="nav justify-content-center pb-3 mb-3">
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">Home</Link>  
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">Features</Link>  
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">Pricing</Link>  
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">FAQs</Link>  
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">About</Link>  
        </li>
      </ul>
      <p className="text-center text-muted">Developed by <a className="text-white" href="http://www.github.com/mishrole" target="_blank" rel="noreferrer">@mishrole</a> © 2022</p>
    </footer>
  )
}

export default Footer;