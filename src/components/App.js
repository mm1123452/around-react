import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

class App extends React.Component() {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }


  render() {
    return (  
      <Switch>
        <ProtectedRoute path="/" 
          loggedIn={this.state.loggedIn} 
          component={Main} />
        <Route exact path="/">
            {this.state.loggedIn ? 
            <Redirect to="/" /> : <Redirect to="/login" />
            }
        </Route> 
        <Route path="/signin">
          <div className="loginContainer">
            <Login  />
          </div>
        </Route>
        <Route path="/signup">
          <div className="registerContainer">
            <Register />
          </div>
        </Route>
      </Switch> 
    )
  
  }
}
 

export default App;
