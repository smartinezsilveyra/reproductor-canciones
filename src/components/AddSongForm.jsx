import { useState } from 'react';

function AddSongForm({ onAdd, darkMode }) {
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const isYoutubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!name.trim() || !url.trim()) {
      return setError('Todos los campos son obligatorios.');
    }

    if (!isYoutubeUrl(url)) {
      return setError('La URL debe ser de YouTube.');
    }

    const songs = JSON.parse(localStorage.getItem('songs')) || [];

    const exists = songs.some((song) => song.url === url);
    if (exists) {
      return setError('La URL ya está agregada.');
    }

    const newSong = {
      name,
      url,
      playCount: 0,
    };

    const updatedSongs = [...songs, newSong];

    localStorage.setItem('songs', JSON.stringify(updatedSongs));

    setName('');
    setUrl('');
    setError('');
    onAdd();
  };

  return (
    <form className={darkMode ? 'dark' : 'light'} onSubmit={handleSubmit}>
      <h2>Agregar Canción</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section className='input-container'>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className={darkMode ? 'dark' : ''}
          />
        </div>
        <div>
          <label>URL de YouTube:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={darkMode ? 'dark' : ''}
          />
        </div>
      </section>
      <div className="add-button-container">
        <button type="submit" className={`add-button ${darkMode ? 'dark' : ''}`} >Agregar</button>
      </div>
    </form>
  );
}

export default AddSongForm;