import React from 'react';
import api from "../utils/api";
import "../blocks/places/places.css";
import "../blocks/card/card.css";

function Card({ card, setSelectedCard, setCards, currentUser }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) =>
              cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
        .removeCard(card._id)
        .then(() => {
          setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(err));
  }

  function handleClick() {
    handleCardClick(card);
  }

  function handleLikeClick() {
    handleCardLike(card);
  }

  function handleDeleteClick() {
    handleCardDelete(card);
  }

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={handleClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
