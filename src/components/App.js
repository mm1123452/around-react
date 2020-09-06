import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
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



  React.useEffect(() => {
    api
      .getProfile()
      //.then(({ _id, name, avatar, about }) => {
      .then((res) => {
        console.log(res)
        setCurrentUser(res)
        //console.log('current',currentUser)
        //setUserName(name);
        // setDescription(about);
        // setAvatar(avatar);
        // setUserId(_id);
      })
      .catch((err) => {
        console.log(err);
      });

    // api
    //   .getInitialCards()
    //   .then((res) => {
    //     setCards(res.slice(0, 6));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);


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

  const editFormProps = { 
    title:"Edit Profile", name:"edit", 
    inputPlaceholder1: "Name",
    inputPlaceholder2: "About Me",
    isOpen:isEditProfilePopupOpen,
    onClose:closeAllPopups,
    buttonText:"Save",
    disableButton:true
  }

  const addPlaceProps = { 
    title:"New Place", name:"add-place", 
    inputPlaceholder1: "Title",
    inputPlaceholder2: "Image link",
    isOpen:isAddPlacePopupOpen,
    onClose:closeAllPopups,
    buttonText:"Create",
    disableButton:true

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

  const handleUpdateAvatar = (avatar) => {
    // api
    // .updateProfileAvatar(avatar)
    // .then(res =>  setCurrentUser(res))
  }

  return (  
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main 
          onAddPlace={handleAddPlaceClick} 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick }
          onDelete={handleDeleteClick}
          onCardClick={handleCardClick}/>
        <Footer/>
        <PopupWithForm {...addPlaceProps}/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}  />
        <PopupWithForm {...confirmProps}/>
        {selectedCard && 
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>}
      </CurrentUserContext.Provider>
    </>   
  );
}

export default App;
