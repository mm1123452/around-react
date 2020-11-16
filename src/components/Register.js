import React from "react";
import {
  
  Link,
  useHistory

} from 'react-router-dom';
import { auth } from "../utils/auth";


function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let history = useHistory();
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = (e ) => {
    e.preventDefault()
    console.log('username',email)
    console.log('password',password)
    auth.register(email, password).then((res) => {
      console.log('res',res)
      if(res){
        // this.setState({
        //   message: ''
        // }, () => {
        //   this.props.history.push('/signin');
        // })
        console.log('success')
         history.push('/signin');
      } else {

        // this.setState({
        //   message: 'Something went wrong!'
        // })
        console.log('something went wrong')
      }
    });
  }



  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Sign Up</h2>
        <input
          className="login__input"
          type="text"
          name="email"
          placeholder="Email"
          value={email }
          onChange={handleEmailChange}
          required
        />   
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Password"
           value={password  }
           onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="login__button">Sign up</button>
       <p className="login__message">Already a member?
        <Link to="/signin" className="login__link"> Log in here!</Link>
      </p>
      </form>
    </div>   
  );
}

export default Login;