import React, { useState, useEffect } from 'react';


export default function Player({ symbol, isActive, initialName, onNameChange }) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    onNameChange(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className={`player ${isActive ? 'active' : ''}`}>
      {isEditing ? (
        <div className="name-input">
          <input
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="player-info" onClick={() => setIsEditing(true)}>
          <p className="player-name">{name}</p>
          <p className="player-symbol">{symbol}</p>
        </div>
      )}
    </div>
  );
}

