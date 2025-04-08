import React, { useState, KeyboardEvent } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for recipes by keywords or ingredients..."
        className="search-input"
        aria-label="Search recipes"
      />
      <button
        className="search-button"
        onClick={handleSearch}
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
