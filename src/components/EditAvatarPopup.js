import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const editAvatarProps = {
    title: "Change profile picture",
    name: "profile-picture",
    inputPlaceholder2: "Image link",
    isOpen: props.isOpen,
    onClose: props.onClose,
    buttonText: "Save",
    disableButton: true,
    onSubmit: handleSubmit
  };

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
   
      //avatar:
    });  
  }

  return (
    <>
      <PopupWithForm {...editAvatarProps} />
    </>
  );
}

export default EditAvatarPopup;
