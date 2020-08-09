import React from "react";

function ImagePopup() {

  return (
    <aside className="popup popup_type_large-image">
      <div className="popup__container">
        <figure className="popup__image-figure">
          <button className="popup__exit"></button>
          <img className="popup__image" alt="figure" />
          <figcaption className="popup__image-title"></figcaption>
        </figure>
      </div>
    </aside>
  );
}

export default ImagePopup;
