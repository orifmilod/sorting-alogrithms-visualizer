import React from 'react'
import './style.css';
export default function Navbar(params) {
  return(
    <div className='nav-container'>
      <div class="dropdown-container">
        <div class="dropdown-toggle click-dropdown">
          DropDown Menu
        </div>
        <div class="dropdown-menu drio">
          <ul>
            <li><a href="#">DropDown Menu Item 1</a></li>
            <li><a href="#">DropDown Menu Item 2</a></li>
            <li><a href="#">DropDown Menu Item 3</a></li>
            <li><a href="#">DropDown Menu Item 4</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
