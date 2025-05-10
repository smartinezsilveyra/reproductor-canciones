function SortButton({ onSort, darkMode }){
    return (
        <div className="sort-button-container">
            <button 
                onClick={onSort} 
                className={`sort-button ${darkMode ? 'dark' : ''}`}>
                Ordenar por Reproducciones
            </button>
        </div>

    )
}

export default SortButton;