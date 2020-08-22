import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [userDescription, setDescription] = React.useState("");
  const [userAvatar, setAvatar] = React.useState();
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    api
      .getProfile()
      .then(({ _id, name, avatar, about }) => {
        setUserName(name);
        setDescription(about);
        setAvatar(avatar);
        setUserId(_id);
      })
      .catch((err) => {
        console.log(err);
      });

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

  return (
    <main className="main">
      <section className="profile">
        <div className="overlay-container">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className="overlay">
            <div className="edit" onClick={props.onEditAvatar}></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="button button_edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__title">{userDescription}</p>
        </div>
        <button
          className="button button_add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="container">
        <ul className="places">
          {cards.map((data) => {
            return (
              <li className="place" key={data._id}>
                <Card card={data} userId={userId} onCardClick={props.onCardClick} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

