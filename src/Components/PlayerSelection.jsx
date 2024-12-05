import React, { useState, useEffect } from "react";

function PlayerSelection() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [error, setError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false); // État pour activer/désactiver l'alerte
  const [bgColor, setBgColor] = useState("bg-transparent");

  const handleAddPlayer = () => {
    if (!currentPlayer.trim()) {
      setError("Player's name cannot be empty.");
      return;
    }

    if (players.includes(currentPlayer.trim())) {
      setError("This name already exists.");
      return;
    }

    if (players.length >= 6) {
      setError("You can't add more than 6 players.");
      return;
    }

    setPlayers([...players, currentPlayer.trim()]);
    setCurrentPlayer("");
    setError("");
  };

  const handleRandomSelection = () => {
    if (players.length === 0) {
      setError("Add players before selecting one.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * players.length);
    setSelectedPlayer(players[randomIndex]);
    setError("");
  };

  // Gestion de l'effet d'alerte (couleur et musique)
  useEffect(() => {
    let interval;
    let audio;

    if (isAlertActive) {
      // Commence à changer la couleur entre transparent et rouge
      interval = setInterval(() => {
        setBgColor((prevColor) => (prevColor === "bg-transparent" ? "bg-red-500" : "bg-transparent"));
      }, 500);

      // Joue la musique d'alerte
      audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.play().catch((err) => console.error("Audio playback error:", err));
    } else {
      // Réinitialise la couleur à transparent
      setBgColor("bg-transparent");

      // Arrête la musique
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isAlertActive]);

  return (
    <div className={`flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-12 transition-colors duration-500 ${bgColor}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-6">
        Players Management
      </h2>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Player's name"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            onClick={handleAddPlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>

        {error && <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>}

        <ul className="mt-4">
          {players.map((player, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-lg my-1 text-sm sm:text-base">
              {player}
            </li>
          ))}
        </ul>

        <button
          onClick={handleRandomSelection}
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Select Aleatory Player
        </button>

        {selectedPlayer && (
          <p className="mt-4 text-lg sm:text-xl font-bold text-green-600">
            🎉 {selectedPlayer} Begins to play!
          </p>
        )}
      </div>

      <button
        onClick={() => setIsAlertActive(!isAlertActive)}
        className={`mt-6 px-4 py-2 rounded-lg text-white text-sm sm:text-base ${
          isAlertActive ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isAlertActive ? "Deactivate Alert" : "Activate Alert"}
      </button>
    </div>
  );
}

export default PlayerSelection;
