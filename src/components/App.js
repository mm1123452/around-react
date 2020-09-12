import React from 'react';
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

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState()
  const [cardId, setCardId] = React.useState()
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);

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
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res)  
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {     
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  const handleCardDelete = (cardId) => {  
    api.deleteCard(cardId).then((res) => {   
       const newCards = cards.filter((c) => c._id !== cardId ? c:null);
       setCards(newCards);
     });
  }

  const handleAddPlaceClick = (e) => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleEditAvatarClick = (e) => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(true)
    setCardId(cardId)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard(null)
    setIsImagePopupOpen(false)
  }

  const deleteCard = (e) => {
    e.preventDefault()

    api
    .deleteCard(cardId)
    .then(res => {
      setCardId(null)
    })
    .catch((err) => {
      console.log(err);
    });
 
    closeAllPopups()
  }

  const confirmProps = {
    title:"Are you sure?", name:"confirm", 
    isOpen:isConfirmPopupOpen,
    onClose:closeAllPopups,
    buttonText:"Yes",
    disableButton:false,
    handleSubmit: deleteCard
  }

  const handleUpdateUser = (profileData) => {
    api
    .updateProfileData(profileData)
    .then(res =>  setCurrentUser(res))
  }

  const handleUpdateAvatar = (data) => {
     api
     .updateProfileAvatar(data.avatar)
     .then(res =>  setCurrentUser(res))
  }

  const handleAddPlace = (data) => {
     api
     .postCard(data)
     .then(newCard => { 
      setCards([...cards,newCard])
      
    })
    
  }

  return (  
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main 
          cards = {cards}
          onAddPlace={handleAddPlaceClick} 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick }
          onDelete={handleDeleteClick}
          onCardClick={handleCardClick}
          onCardLike={ handleCardLike }
          onCardDelete={handleCardDelete }/>
        <Footer/>
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
            />
        <PopupWithForm {...confirmProps}/>
        {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>}
      </CurrentUserContext.Provider>
    </>   
  );
}

export default App;
