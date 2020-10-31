import React from 'react';
import { useLocation } from 'react-router-dom'

function Header() {
  const url = useLocation().pathname
  let option; 
  let email;
  
  if (url === "/signin") {
    option = "Sign up";
  } else if (url === "signup") {
    option = "Log in";
  }

  return (
    <header className="header">
      {console.log(url)}
      <div className="logo"></div>
      <div className="header__option-container">
        <p className="header__email">{email}</p>
        <p className="header__option">{option}</p>
      </div>
      
    </header>
  )
}

export default Header;