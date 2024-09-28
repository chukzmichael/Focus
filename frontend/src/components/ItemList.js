import React from 'react';
import '../styles/ItemList.css';

const ItemList = ({ items, onSelectItem }) => {
  return (
    <div className="item-list">
      <h2>Curated Items</h2>
      {items.length === 0 ? (
        <p>No items available. Be the first to submit!</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.itemIdentifier} onClick={() => onSelectItem(item)}>
              <h3>{item.headline}</h3>
              <p className="topic">Topic: {item.topic}</p>
              <div className="item-stats">
                <span>Appraisals: {item.appraisals}</span>
                <span>Gratuities: {item.gratuities}</span>
                <span>Flags: {item.flags}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
