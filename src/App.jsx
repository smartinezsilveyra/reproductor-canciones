import { useState, useEffect } from 'react';
import AddSongForm from './components/AddSongForm';
import SongList from './components/SongList';
import PlayerModal from './components/PlayerModal';
import SearchBar from './components/SearchBar';
import SortButton from './components/SortButton';


function App() {
  
  const [refresh, setRefresh] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); 
  const [search, setSearch] = useState('');
  const [sorted, setSorted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleAddSong = () => setRefresh(!refresh); 

  const getFilteredSongs = () => {
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sorted) {
      filtered.sort((a, b) => b.playCount - a.playCount);
    }
    return filtered;
  };
  
  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}> 
      <h1>Reproductor de Canciones</h1>

      <div className="theme-toggle">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={darkMode ? 'dark' : 'light'}
        >
          {darkMode ? '☀️' : '🌑'}
        </button> 
      </div>
  
      <AddSongForm onAdd={handleAddSong} darkMode={darkMode} />

      <h2>Lista de Canciones</h2>
      <SortButton onSort={() => setSorted(!sorted)} darkMode={darkMode} />
      <SearchBar value={search} onChange={setSearch} darkMode={darkMode} />
      
      <SongList
        refresh={refresh}
        onPlay={(song) => setCurrentSong(song)} 
        onDelete={() => setRefresh(!refresh)} 
        songs={getFilteredSongs()}
        darkMode={darkMode}
      />

      {currentSong && (
        <PlayerModal
          isOpen={!!currentSong}
          onClose={() => setCurrentSong(null)}
          videoUrl={currentSong.url}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;
