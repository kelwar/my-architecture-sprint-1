import React from "react";
import api from "../utils/api";
import "../blocks/profile/profile.css";

export default function Profile({ currentUser, setCurrentUser,
                                    setIsEditAvatarPopupOpen, setIsEditProfilePopupOpen, setIsAddPlacePopupOpen }) {
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    React.useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleEditProfileClick() {
        console.debug("handleEditProfileClick");
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    return (
        <section className="profile page__section">
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        </section>
    );
}