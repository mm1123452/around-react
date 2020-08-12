import React from "react";

function Card({link, name, likes, cardOwnerId, userId}) {
  return (
    <>
      <img className="place__image" src={link} alt={name}/>
      {userId === cardOwnerId ? <div className="place__delete"></div> : null}
      <div className="place__info">
        <h3 className="place__name">{name}</h3>
        <div className="place__icon-container">
          <div className="place__icon"></div>
          <span className="place__likes-count">{likes}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
