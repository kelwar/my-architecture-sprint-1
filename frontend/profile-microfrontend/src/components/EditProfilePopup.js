import React, {lazy} from 'react';
import api from "../utils/api";
import "../blocks/popup/popup.css";

const PopupWithForm = lazy(() => import('common/PopupWithForm').catch((err) => {
  console.error("EditProfilePopup. PopupWithForm:", err);
  return { default: () => <div className='error'>PopupWithForm Component is not available!</div> }
}));

function EditProfilePopup({ isOpen, setIsOpen, currentUser, setCurrentUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleUpdateUser(userUpdate) {
    api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          setIsOpen(false);
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  function handleCloseClick(e) {
    setIsOpen(false);
  }

  console.debug("EditProfilePopup.isOpen: ", isOpen);

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleCloseClick} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"
               value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
