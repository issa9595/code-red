import React, { useState, useEffect } from "react";

function PlayerSelection() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [error, setError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false); // État pour activer/désactiver l'alerte
  const [bgColor, setBgColor] = useState("bg-white");

  const handleAddPlayer = () => {
    if (!currentPlayer.trim()) {
      setError("Le pseudo ne peut pas être vide.");
      return;
    }

    if (players.includes(currentPlayer.trim())) {
      setError("Ce pseudo existe déjà.");
      return;
    }

    if (players.length >= 6) {
      setError("Vous ne pouvez pas ajouter plus de 6 joueurs.");
      return;
    }

    setPlayers([...players, currentPlayer.trim()]);
    setCurrentPlayer("");
    setError("");
  };

  const handleRandomSelection = () => {
    if (players.length === 0) {
      setError("Ajoutez des joueurs avant de sélectionner.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * players.length);
    setSelectedPlayer(players[randomIndex]);
    setError("");
  };

  // Gestion de l'effet d'alerte
  useEffect(() => {
    let interval;
    let audio;

    if (isAlertActive) {
      // Commence à changer la couleur
      interval = setInterval(() => {
        setBgColor((prevColor) => (prevColor === "bg-white" ? "bg-red-500" : "bg-white"));
      }, 500);

      // Joue la musique d'alerte
      audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.play();
    } else {
      // Arrête la transition de couleur
      setBgColor("bg-white");

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
    <div className={`flex flex-col items-center ${bgColor} min-h-screen p-6 transition-colors duration-500`}>
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Gestion des Joueurs</h1>
      
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Pseudo du joueur"
            value={currentPlayer}
            onChange={(e) => setCurrentPlayer(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={handleAddPlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Ajouter
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <ul className="mt-4">
          {players.map((player, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-lg my-1">
              {player}
            </li>
          ))}
        </ul>

        <button
          onClick={handleRandomSelection}
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Sélectionner un joueur aléatoire
        </button>

        {selectedPlayer && (
          <p className="mt-4 text-xl font-bold text-green-600">
            🎉 {selectedPlayer} commence à jouer !
          </p>
        )}
      </div>

      <button
        onClick={() => setIsAlertActive(!isAlertActive)}
        className={`mt-6 px-4 py-2 rounded-lg text-white ${
          isAlertActive ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isAlertActive ? "Désactiver l'alerte" : "Activer l'alerte"}
      </button>
    </div>
  );
}

export default PlayerSelection;
