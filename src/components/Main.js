import React from "react";
import { api } from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main(props) {
  const {name, about, avatar, _id} = React.useContext(CurrentUserContext);
 
  const [cards, setCards] = React.useState([]);
 // const [userName, setUserName] = React.useState("");
  //const [userDescription, setDescription] = React.useState("");
 // const [userAvatar, setAvatar] = React.useState();
  //const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    // api
    //   .getProfile()
    //   .then(({ _id, name, avatar, about }) => {
    //     setUserName(name);
    //     setDescription(about);
    //     setAvatar(avatar);
    //     setUserId(_id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    api
      .getInitialCards()
      .then((res) => {
        //setCards(res.slice(0, 6));
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === _id);
    
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

  return (
    <main className="main">
      <section className="profile">
        <div className="overlay-container">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <div className="overlay">
            <div className="edit" onClick={props.onEditAvatar}></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="button button_edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__title">{about}</p>
        </div>
        <button
          className="button button_add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="container">
        <ul className="places">
          {cards.map((data,index) => {
            return (
              <li className="place" key={index}>
                <Card card={data} userId={_id} 
                  onCardClick={props.onCardClick} 
                  onDeleteClick={props.onDelete}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

