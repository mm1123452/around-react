import React from "react";

function Card(props) {
  const { link, name } = props.card;
  const cardOwnerId = props.card.owner._id;
  const likes = props.card.likes.length;
  const userId = props.userId
  const cardId = props.card._id
  

  function handleClick() {
    props.onCardClick(props.card);
  }

  const handleDelete = () => {
    props.onDeleteClick(cardId)
  }

  return (
    <>
      <img className="place__image" src={link} alt={name} onClick={handleClick}/>
      {userId === cardOwnerId ? <div className="place__delete" onClick={handleDelete}></div> : null}
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
