import React from "react";

function PopupWithForm({ title,name, isOpen,onClose,buttonText,inputPlaceholder1,inputPlaceholder2}) {
  const popupClass = isOpen ? 
    `popup popup_type_${name} popup_opened` :
    `popup popup_type_${name}`

  return (
    <div>
      <aside className={popupClass}>
        <div className="popup__container">
          <form className="popup__form">
            <h2 className="popup__title">{title}</h2>
            {inputPlaceholder1 && <input
              className="popup__input popup__name"
              type="text"
              name="title"
              placeholder={inputPlaceholder1}
              minLength="1"
              maxLength="30"
              required
            />}
            <span
              id="popup__title-error"
              className="popup__input_type_error"
            ></span>
            {inputPlaceholder2 && <input
              className="popup__input popup__about"
              type="url"
              name="link"
              placeholder={inputPlaceholder2}
              pattern="https?://.+"
              required
            />}
            <span
              id="popup__link-error"
              className="popup__input_type_error"
            ></span>
            <button className="popup__button popup__button_disabled">{buttonText}</button>
            <button className="popup__exit" onClick={onClose}></button>
          </form>
        </div>
      </aside> 
    </div>
  );
}

export default PopupWithForm;
