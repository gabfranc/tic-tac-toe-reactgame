import React, { useState, useEffect } from 'react';
import './Player.css';

export default function Player({ symbol, isActive, initialName, onNameChange }) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onNameChange(name);
  };

  return (
    <li className={`player ${isActive ? 'active' : 'inactive'}`}>
      <div>
        {symbol}: {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>{name}</span>
        )}
      </div>
    </li>
  );
}
