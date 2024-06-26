import React, { useState, useEffect } from 'react'; // Import React and the necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests

// Functional component to display a list of Marvel characters
const CharacterList = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]); // State to hold the list of characters

  // useEffect hook to fetch characters from the Marvel API when the component mounts
  useEffect(() => {
    // Function to fetch characters from the API
    const fetchCharacters = async () => {
      const publicKey = '67d1203e33c918b781c63868a70a9497'; // Marvel API public key
      const hash = '835c66845211fca13b1642d678c56507'; // Hash generated from timestamp, private key, and public key
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`; // API endpoint with query parameters

      try {
        // Make the API request using axios
        const response = await axios.get(url);
        // Set the characters state with the response data
        setCharacters(response.data.data.results);
      } catch (error) {
        // Log any errors to the console
        console.error("Error fetching characters:", error);
      }
    };

    // Call the fetchCharacters function to get the character data
    fetchCharacters();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <h1>Marvel Characters</h1> {/* Display a header */}
      <div className="character-list">
        {characters.map(character => (
          // For each character, create a div that displays the character's name and thumbnail
          <div key={character.id} onClick={() => onSelectCharacter(character.id)}> {/* Set the character ID as the key and attach an onClick handler */}
            <h2>{character.name}</h2> {/* Display character name */}
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} /> {/* Display character thumbnail */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList; // Export the component
