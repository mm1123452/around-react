import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useParams,
  useHistory,
  withRouter 
 
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [cardId, setCardId] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({data:''});
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [loginSuccess, setLoginSucces] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  let history = useHistory();



  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  React.useEffect(() => {
    if (token) {
      console.log('check token')
      auth.getContent(token)
      .then((res) => {       
        if (res) {
          const data = {
            id: res.data._id,
            email: res.data.email
          }
          setloggedIn(true)
          console.log('data',res)
          setUserData({...userData,data})
         
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  React.useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        const newCards = cards.filter((c) => (c._id !== cardId ? c : null));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceClick = (e) => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = (e) => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(true);
    setCardId(cardId);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
  };

  const handleAddPlace = (data) => {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (profileData) => {
    api
      .updateProfileData(profileData)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateProfileAvatar(data.avatar)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (e) => {
    e.preventDefault();

    api
      .deleteCard(cardId)
      .then((res) => {
        setCardId(null);
      })
      .catch((err) => {
        console.log(err);
      });

    closeAllPopups();
  };

  const handleLogin = () => {
    console.log('handleLogin')
    setloggedIn(true)
   
  }

  // const tokenCheck = () => {
  //   //const token = localStorage.getItem('token');
  //   if (token) {
  //     console.log('check token')
  //     auth.getContent(token)
  //     .then((res) => {       
  //       if (res) {
  //         const data = {
  //           id: res.data._id,
  //           email: res.data.email
  //         }
  //         setloggedIn(true)
  //         console.log('data',res)
         
  //         history.push('/');
  //       }
  //     });
  //   }
  // }

  const confirmProps = {
    title: "Are you sure?",
    name: "confirm",
    isOpen: isConfirmPopupOpen,
    onClose: closeAllPopups,
    buttonText: "Yes",
    disableButton: false,
    handleSubmit: deleteCard,
  };

  return (

    <CurrentUserContext.Provider value={currentUser}>
        <Header email={userData.data.email}/>
        
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onDelete={handleDeleteClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
            
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupWithForm {...confirmProps} />
            {selectedCard && (
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
              />
            )}
          </ProtectedRoute>
          
          <Route path="/signin">
              <Login onLogin = {handleLogin}/>
          </Route>
          <Route path="/signup">
           
              <Register />
          
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
   
    </CurrentUserContext.Provider>
  );
}

export default  withRouter(App);
