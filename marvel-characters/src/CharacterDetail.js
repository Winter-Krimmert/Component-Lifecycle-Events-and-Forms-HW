import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests

// Functional component to display detailed information about a character
const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null); // State to hold character details

  useEffect(() => {
    // Function to fetch character details from the API
    const fetchCharacterDetail = async () => {
      const publicKey = '67d1203e33c918b781c63868a70a9497'; // Marvel API public key
      const hash = '835c66845211fca13b1642d678c56507'; // Hash generated from timestamp, private key, and public key
      const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`; // API endpoint with query parameters

      try {
        // Make the API request using axios
        const response = await axios.get(url);
        // Set the character state with the response data
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        // Log any errors to the console
        console.error("Error fetching character detail:", error);
      }
    };

    // If a characterId is provided, fetch the character details
    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]); // Re-run this effect whenever characterId changes

  // If no character data is available yet, display a message
  if (!character) {
    return <div>Select a character to see details</div>;
  }

  // Render the character details
  return (
    <div>
      <h1>{character.name}</h1> {/* Display character name */}
      <p>{character.description || 'No description available.'}</p> {/* Display character description or a default message if none */}
      <h2>Comics</h2> {/* Header for comics section */}
      <ul>
        {character.comics.items.map(comic => ( // Loop through comics and display each one
          <li key={comic.resourceURI}>{comic.name}</li> // Display comic name
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail; // Export the component
