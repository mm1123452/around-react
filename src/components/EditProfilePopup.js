import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const {name, about} = React.useContext(CurrentUserContext);
  const [profileName, setProfileName] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (name && about) {
      setProfileName(name);
      setDescription(about);
    }
   
  }, [name,about]);

  const handleInputChange = (e) => {
    if (e.target.name === 'title') {
      setProfileName(e.target.value)
    } else if (e.target.name === 'link') {
      setDescription(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: profileName,
      about: description,
    });  
  }

  const editFormProps = {
    title: "Edit Profile",
    name: "edit",
    inputPlaceholder1: "Name",
    inputPlaceholder2: "About Me",
    input2Type:"text",
    isOpen: props.isOpen,
    onClose: props.onClose,
    buttonText: "Save",
    disableButton: false,
    inputValue1: profileName,
    inputValue2: description,
    onInputChange: handleInputChange,
    onSubmit: handleSubmit
  };

  return (
    <>
      <PopupWithForm {...editFormProps} />
    </>
  );
}

export default EditProfilePopup;
