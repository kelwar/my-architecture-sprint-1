import React from "react";
import Card from "./Card";
import api from "../utils/api";
import "../blocks/places/places.css";

export default function Places({ cards, setCards, setSelectedCard, currentUser }) {
    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        setSelectedCard={setSelectedCard}
                        setCards={setCards}
                        currentUser={currentUser}
                    />
                ))}
            </ul>
        </section>
    );
}