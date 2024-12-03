import React, { useState, useEffect } from "react";

function AlertPage() {
  const [bgColor, setBgColor] = useState("bg-white");

  useEffect(() => {
    // Change la couleur de fond toutes les 500ms
    const interval = setInterval(() => {
      setBgColor((prevColor) => (prevColor === "bg-white" ? "bg-red-500" : "bg-white"));
    }, 500);

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Lecture de la musique
    const audio = new Audio("/alert.mp3"); // Remplacez par le chemin de votre fichier audio
    audio.loop = true;
    audio.play();

    // Arrêt de la musique lors du démontage
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className={`h-screen ${bgColor} flex items-center justify-center transition-colors duration-500`}>
      <h1 className="text-4xl font-bold text-white">Alerte en cours !</h1>
    </div>
  );
}

export default AlertPage;
