import React, {lazy} from 'react';
import api from "../utils/api";
import "../blocks/popup/popup.css";

const PopupWithForm = lazy(() => import('common/PopupWithForm').catch((err) => {
  console.error("EditAvatarPopup. PopupWithForm:", err);
  return { default: () => <div className='error'>PopupWithForm Component is not available!</div> }
}));

function EditAvatarPopup({ isOpen, setIsOpen, setCurrentUser}) {
  const inputRef = React.useRef();

  function handleUpdateAvatar(avatarUpdate) {
    api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          setIsOpen(false);
        })
        .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleCloseClick(e) {
    setIsOpen(false);
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={handleCloseClick} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
