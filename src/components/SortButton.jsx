function SortButton({ onSort, darkMode, buttonText }){
    return (
        <div className="sort-button-container">
            <button 
                onClick={onSort} 
                className={`sort-button ${darkMode ? 'dark' : ''}`}>
                {buttonText}
            </button>
        </div>
    )
}

export default SortButton;