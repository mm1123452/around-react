import React from "react";

function Main() {

  const handleEditAvatarClick = (e) => {
     console.log('avatar click')
     
  }
  const handleEditProfileClick = (e) => {
    
  }
  const handleAddPlaceClick= (e) => {
    
  }
  return (
    <main className="main">
      <section className="profile">
        <div className="overlay-container">
          <div className="avatar"></div>
          <div className="overlay">
            <div className="edit"
             onClick={handleEditAvatarClick}></div>
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">Jacques Cousteau</h1>
          <button className="button button_edit"
             onClick={handleEditProfileClick}></button>
          <p className="profile__title">Explorer</p>
        </div>
        <button className="button button_add"
           onClick={handleAddPlaceClick}></button>
      </section>
      <section className="container">
        <ul className="places"></ul>
      </section>
    </main>
  );
}

export default Main;
