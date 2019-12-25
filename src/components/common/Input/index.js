import React from 'react';
import './style.css';

export default ({ label, ...rest }) => (
  <div className="group">
    <label className='input-label'>{label}</label>
    <input {...rest} required />
  </div>
)