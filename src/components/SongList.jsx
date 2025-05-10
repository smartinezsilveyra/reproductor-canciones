import { useEffect, useState } from 'react';

function SongList({ refresh, songs: externalSongs, onPlay, onDelete, darkMode }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(externalSongs);
  }, [externalSongs, refresh]);

  const handlePlay = (index) => {
    const updatedSongs = [...songs];
    updatedSongs[index].playCount += 1;

    setSongs(updatedSongs);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
    onPlay(updatedSongs[index]);
  };

  const handleDelete = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1); 
    setSongs(updatedSongs);
    localStorage.setItem('songs', JSON.stringify(updatedSongs));
    onDelete(); 
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {songs.length === 0 ? (
        <p>No hay canciones guardadas.</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index} className={darkMode ? 'dark' : ''}>
              <h3>{song.name}</h3>
              <p> Reproducciones: {song.playCount}</p>
              <div className="card-buttons">
                <button onClick={() => handlePlay(index)} className={darkMode ? 'dark' : ''}>
                  Play
                </button>
                <button onClick={() => handleDelete(index)} className={darkMode ? 'dark' : 'light'}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongList;