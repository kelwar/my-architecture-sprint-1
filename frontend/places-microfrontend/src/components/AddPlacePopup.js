import React, {lazy} from 'react';
import api from "../utils/api";
import "../blocks/popup/popup.css";

const PopupWithForm = lazy(() => import('common/PopupWithForm').catch((err) => {
  console.error("AddPlacePopup. PopupWithForm:", err);
  return { default: () => <div className='error'>PopupWithForm Component is not available!</div> }
}));

function AddPlacePopup({ isOpen, setIsOpen, cards, setCards}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(newCard) {
    api
        .addCard(newCard)
        .then((newCardFull) => {
          setCards([newCardFull, ...cards]);
          setIsOpen(false);
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleAddPlaceSubmit({
      name,
      link
    });
  }

  function handleCloseClick(e) {
    setIsOpen(false);
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleCloseClick} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
