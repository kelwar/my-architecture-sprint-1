import React, {lazy, useState, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CurrentUserContext} from "./contexts/CurrentUserContext";

import Main from "./components/Main";
import "./index.css";

const PopupWithForm = lazy(() => import('common/PopupWithForm').catch((err) => {
    console.error("App. PopupWithForm:", err);
    return { default: () => <div className='error'>PopupWithForm Component is not available!</div> }
}));

const Footer = lazy(() => import('common/Footer').catch((err) => {
    console.error("App. Footer:", err);
    return { default: () => <div className='error'>Footer Component is not available!</div> }
}));

const Header = lazy(() => import('auth/Header').catch((err) => {
    console.error("App. Header:", err);
    return { default: () => <div className='error'>Header Component is not available!</div> }
}));

const Login = lazy(() => import('auth/Login').catch((err) => {
    console.error("App. Login:", err);
    return { default: () => <div className='error'>Login Component is not available!</div> }
}));

const Register = lazy(() => import('auth/Register').catch((err) => {
    console.error("App. Register:", err);
    return { default: () => <div className='error'>Register Component is not available!</div> }
}));

const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch((err) => {
    console.error("App. InfoTooltip:", err);
    return { default: () => <div className='error'>InfoTooltip Component is not available!</div> }
}));

const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch((err) => {
    console.error("App. EditAvatarPopup:", err);
    return { default: () => <div className='error'>EditAvatarPopup Component is not available!</div> }
}));

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch((err) => {
    console.error("App. EditProfilePopup:", err);
    return { default: () => <div className='error'>EditProfilePopup Component is not available!</div> }
}));

const AddPlacePopup = lazy(() => import('places/AddPlacePopup').catch((err) => {
    console.error("App. AddPlacePopup:", err);
    return { default: () => <div className='error'>AddPlacePopup Component is not available!</div> }
}));

const ImagePopup = lazy(() => import('places/ImagePopup').catch((err) => {
    console.error("App. ImagePopup:", err);
    return { default: () => <div className='error'>ImagePopup Component is not available!</div> }
}));

const Root = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = useState({});

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Suspense>
                    <Header setIsLoggedIn={setIsLoggedIn} />
                </Suspense>
                <Suspense>
                    <Routes>
                        <Route exact path={"/"} element={isLoggedIn ?
                            <Main cards={cards}
                                  setCards={setCards}
                                  currentUser={currentUser}
                                  setCurrentUser={setCurrentUser}
                                  setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
                                  setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
                                  setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
                                  setSelectedCard={setSelectedCard} /> :
                            <Navigate to="./signin" />
                        } />
                        <Route path="/signup" element={<Register setTooltipStatus={setTooltipStatus}
                                                                 setIsInfoToolTipOpen={setIsInfoToolTipOpen} />} />
                        <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn}
                                                              setTooltipStatus={setTooltipStatus}
                                                              setIsInfoToolTipOpen={setIsInfoToolTipOpen} />} />
                    </Routes>
                </Suspense>
                <Suspense>
                    <Footer />
                </Suspense>
                <Suspense>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        setIsOpen={setIsEditProfilePopupOpen}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                </Suspense>
                <Suspense>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        setIsOpen={setIsAddPlacePopupOpen}
                        cards={cards}
                        setCards={setCards}
                    />
                </Suspense>
                <Suspense>
                    <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
                </Suspense>
                <Suspense>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        setIsOpen={setIsEditAvatarPopupOpen}
                        setCurrentUser={setCurrentUser}
                    />
                </Suspense>
                <Suspense>
                    <ImagePopup card={selectedCard} setCard={setSelectedCard} />
                </Suspense>
                <Suspense>
                    <InfoTooltip
                        isOpen={isInfoToolTipOpen}
                        setIsOpen={setIsInfoToolTipOpen}
                        status={tooltipStatus}
                    />
                </Suspense>
            </div>
        </CurrentUserContext.Provider>
    );
}

const App = () => (
    <BrowserRouter>
        <Root />
    </BrowserRouter>
);

createRoot(document.getElementById("app")).render(<App />);
