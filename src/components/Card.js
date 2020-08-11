import React from "react";

function Card(props) {
  return (
    <div>
      <img className="place__image" src={props.link} alt={props.name}/>
      <div className="place__delete"></div>
      <div className="place__info">
        <h3 className="place__name">{props.name}</h3>
        <div className="place__icon-container">
          <div className="place__icon"></div>
          <span className="place__likes-count">{props.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
