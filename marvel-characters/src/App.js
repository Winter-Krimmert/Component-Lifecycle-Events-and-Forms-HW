// src/App.js
import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import './App.css';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleSelectCharacter = (characterId) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <div className="App">
      <CharacterList onSelectCharacter={handleSelectCharacter} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
};

export default App;
