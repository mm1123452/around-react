import React from 'react';
import { useLocation,Link } from 'react-router-dom'

function Header({email}) {
  const url = useLocation().pathname
  let option; 
  let link;

  if (url === "/signin") {
    option = "Sign up";
    link = "/signup"
  } else if (url === "/signup") {
    option = "Log in";
    link = "/signin"
  } else if (url === "/")  {
    option = 'Log out'
    link = "google.com"
  }

  return (
    <header className="header">
      {console.log(email)}
      <div className="logo"></div>
      <div className="header__option-container">
        <p className="header__email">{email}</p>
        <p className="header__option"> 
        <Link to={link} className="login__link" > {option}</Link>
         </p>
      </div>
      
    </header>
  )
}

export default Header;