import React, {lazy} from 'react';
import "../blocks/content/content.css";

const Profile = lazy(() => import('profile/Profile').catch((err) => {
    console.error("Main. Profile:", err);
    return { default: () => <div className='error'>Profile Component is not available!</div> }
}));

const Places = lazy(() => import('places/Places').catch((err) => {
    console.error("Main. Places:", err);
    return { default: () => <div className='error'>Places Component is not available!</div> }
}));

function Main({ cards, setCards, currentUser, setCurrentUser,
                  setIsEditProfilePopupOpen, setIsAddPlacePopupOpen, setIsEditAvatarPopupOpen, setSelectedCard }) {
  return (
    <main className="content">
        <Profile currentUser={currentUser} setCurrentUser={setCurrentUser}
                 setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
                 setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
                 setIsAddPlacePopupOpen={setIsAddPlacePopupOpen} />
        <Places cards={cards} setCards={setCards} setSelectedCard={setSelectedCard} currentUser={currentUser} />
    </main>
  );
}

export default Main;
