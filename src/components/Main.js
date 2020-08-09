import React from "react";
import {api} from '../utils/api';

function Main() {
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
      // userId = _id
      // const obj = {name, avatar, id: _id, job:about}
      // userInfo.setUserInfo(obj)
    })
    .catch( err => {
      console.log(err)
    })
    // function handleMouseMove(event) {
    //   setPosition({
    //     top: event.pageY,
    //     left: event.pageX,
    //   });
    // }

    // list of actions inside one hook
    // document.addEventListener('mousemove', handleMouseMove);
    // document.body.classList.add('no-cursor');

    // we're returning a function that remove our effects
    return () => {
      //document.body.classList.remove('no-cursor');
      //document.removeEventListener('mousemove', handleMouseMove);
    };
  });

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
        <ul className="places"></ul>
      </section>
    </main>
  );
}

export default Main;
