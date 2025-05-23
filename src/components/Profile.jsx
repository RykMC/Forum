import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profil() {
  const { id } = useParams();
  const [profil, setProfil] = useState(null);
  const [error, setError] = useState("");

  // 1. Alle Avatarbilder aus dem Ordner laden (zur Buildzeit)
  const avatarModule = import.meta.glob('./assets/avatare/*.png', { eager: true });
  const avatarBilder = Object.entries(avatarModule).map(([pfad, modul]) => ({
    dateiname: pfad.split("/").pop(),
    url: modul.default,
  }));

  useEffect(() => {
    const ladeProfil = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/forum/profil", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfil(res.data);
        console.log("Profil geladen:", res.data);
      } catch (err) {
        console.error(err);
        setError("Profil konnte nicht geladen werden.");
      }
    };
    
    ladeProfil();
  }, []);

  // 2. Avatar speichern
  const handleAvatarWahl = async (bild) => {
    try {
      await axios.put(
        "http://localhost:3001/api/forum/avatar",
        { avatar: bild },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(bild);
      setProfil({ ...profil, avatar: bild });
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  };

  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!profil) return <p className="text-gray-400 p-6">Lade Profil...</p>;

  const beitritt = new Date(profil.beitritt * 1000).toLocaleDateString("de-DE");
  const aktuellerAvatar = avatarBilder.find((a) => a.dateiname === profil.avatar)?.url;
  console.log("Der hier: ", profil.avatar);
  return (
    
     <div className="p-6 bg-gray-900 min-h-screen text-white">
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-yellow-300 border-b border-yellow-500 pb-2">
        👤 Profil von {profil.name}
      </h1>

      {/* Aktueller Avatar */}
      
      {profil.avatar && aktuellerAvatar ? (
        <img
          src={aktuellerAvatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-500"
        />
      ) : (
        <p className="text-gray-400">Kein Avatar gesetzt</p>
      )}
                

      <div className="space-y-2 text-lg">
        <p>
          <span className="text-yellow-400">Beigetreten:</span> {beitritt}
        </p>
        <p>
          <span className="text-yellow-400">Themen erstellt:</span> {profil.themen}
        </p>
        <p>
          <span className="text-yellow-400">Beiträge verfasst:</span> {profil.beitraege}
        </p>
      </div>

      {/* Avatarauswahl */}
      <h2 className="text-xl text-yellow-300 mt-6">Avatar auswählen:</h2>
      <div className="grid grid-cols-10 gap-4 mt-2">
        {avatarBilder.map(({ dateiname, url }) => (
          <img
            key={dateiname}
            src={url}
            alt={dateiname}
            onClick={() => handleAvatarWahl(dateiname)}
            className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all duration-200 ${
              profil.avatar === dateiname
                ? "border-yellow-400 scale-110"
                : "border-gray-600 hover:border-yellow-300 hover:scale-105"
            }`}
          />
        ))}
      </div>
    </div>
    
    </div>
  );
}
