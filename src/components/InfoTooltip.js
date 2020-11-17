import React from "react";

function InfoTooltip({isOpen, success}) {

  const popupClass = isOpen ? 
  `popup popup_type_tooltip popup_opened` :
  `popup popup_type_tooltip`

  const message = success ? 
  `Success! You have now been registered.` :
  `Oops, something went wrong! Please try again.`

  return (
    <aside className={popupClass}>
      <div className="popup__container">
      <form class="popup__form">
        <div class="popup__icon"></div>
        <h2 class="popup__title">{message}</h2>
        <button class="popup__exit"></button>
      </form>
      </div>
    </aside>
  );
}

export default InfoTooltip;