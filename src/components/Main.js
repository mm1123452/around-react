import React from "react";
import {api} from '../utils/api';
import Card from './Card';

function Main(props) {
  const [cards, setCards] = React.useState([])
  const [userName, setUserName] = React.useState('')
  const [userDescription, setDescription] = React.useState('')
  const [userAvatar, setAvatar] = React.useState()
  const [userId, setUserId] = React.useState()

  const handleEditAvatarClick = (e) => {
     console.log('avatar click')
     
  }
  const handleEditProfileClick = (e) => {
    
  }



  React.useEffect(() => {
    api.getProfile()
    .then(({_id, name, avatar, about}) => {
      setUserName(name)
      setDescription(about)
      setAvatar(avatar)
      setUserId(_id)
      console.log(_id,name,avatar,about)
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
          <div 
            className="avatar"
            style={{backgroundImage: `url(${userAvatar})` }}></div>
          <div className="overlay">
            <div className="edit"
             onClick={handleEditAvatarClick}></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="button button_edit"
             onClick={handleEditProfileClick}></button>
          <p className="profile__title">{userDescription}</p>
        </div>
        <button className="button button_add" onClick={props.onAddPlace}></button>
      </section>
      <section className="container">
        <ul className="places">
          {cards.map( ({link, name, likes, owner, _id}) => {
            return (
              <li className="place" key={_id}>
              <Card
                userId = {userId} 
                link={link}
                name={name}
                likes={likes.length}
                cardOwnerId={owner._id}/>
              </li>
            ) 
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
