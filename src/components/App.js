import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState()
  const [cardId, setCardId] = React.useState()


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

  const editAvatarProps = { 
    title:"Change profile picture", name:"profile-picture", 
    inputPlaceholder1: "Image link",
    isOpen:isEditAvatarPopupOpen,
    onClose:closeAllPopups,
    buttonText:"Save",
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

  return (  
      <>
        <Header/>
        <Main 
          onAddPlace={handleAddPlaceClick} 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick }
          onDelete={handleDeleteClick}
          onCardClick={handleCardClick}/>
        <Footer/>
        <PopupWithForm {...addPlaceProps}/>
        <PopupWithForm {...editFormProps}/>
        <PopupWithForm {...editAvatarProps}/>
        <PopupWithForm {...confirmProps}/>
        {selectedCard && 
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>}
      </>   
  );
}

export default App;
