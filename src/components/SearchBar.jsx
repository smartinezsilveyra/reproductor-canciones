function SearchBar({ value, onChange, darkMode }) {
    return (
      <input
        type="text"
        placeholder="Buscar canción..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={darkMode ? 'dark' : ''}
      />
    );
  }
  
  export default SearchBar;