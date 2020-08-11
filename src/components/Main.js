import React from "react";
import {api} from '../utils/api';
import Card from './Card';

function Main() {
  const [cards, setCards] = React.useState([])
//userName
//userDescription
//userAvatar
  const handleEditAvatarClick = (e) => {
     console.log('avatar click')
     
  }
  const handleEditProfileClick = (e) => {
    
  }

  React.useEffect(() => {
    api.getProfile()
    .then(({_id, name, avatar, about}) => {
      console.log(_id,name,avatar)
    })
    .catch( err => {
      console.log(err)
    })

    api.getInitialCards()
    .then(res => {
      console.log('res',res)
      setCards(res.slice(0,6))
    })
    .catch( err => {
      console.log(err)
    })
   
  },[]);

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
        <button className="button button_add"></button>
      </section>
      <section className="container">
        <ul className="places">
          {cards.map( card => {
            return (
              <li key={card._id}>
              <Card 
                link={card.link}
                name={card.name}
                likes={card.likes.length}/>
              </li>
            ) 
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
