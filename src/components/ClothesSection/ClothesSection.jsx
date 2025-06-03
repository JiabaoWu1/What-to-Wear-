import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick, handleCardLike, onlyMine = false }) {
  const { currentUser } = useContext(CurrentUserContext);

  const profileCards = onlyMine && currentUser
    ? clothingItems.filter(item => item.owner === currentUser._id)
    : clothingItems;

  return (
    <div className="clothes-section">
      <div className="items-section">
        <p className="items__label">Your Items</p>
        <button className="items__button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {profileCards.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
