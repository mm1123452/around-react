import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const [title, setTitle] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: imageLink,
    });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "link") {
      setImageLink(e.target.value);
    }
  };

  const addPlaceProps = {
    title: "New Place",
    name: "add-place",
    inputPlaceholder1: "Title",
    inputPlaceholder2: "Image link",
    input2Type:"link",
    isOpen: isOpen,
    onClose: onClose,
    buttonText: "Create",
    disableButton: false,
    onSubmit: handleSubmit,
    onInputChange: handleInputChange,
  };

  return (
    <>
      <PopupWithForm {...addPlaceProps} />
    </>
  );
}

export default AddPlacePopup;
