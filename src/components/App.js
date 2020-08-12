import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  const handleAddPlaceClick = (e) => {
    console.log('clicke add ')
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  return (
      <div >
        <Header/>
        <Main onAddPlace={handleAddPlaceClick}/>
        <Footer/>
        <PopupWithForm 
          title="New Place"
          name="add-place"
          isOpen={isAddPlacePopupOpen}/>
        <ImagePopup/>
      </div>   
  );
}

export default App;
