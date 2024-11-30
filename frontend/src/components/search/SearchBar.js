import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchResults from './SearchResults';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchData = async () => {
      if (!debouncedQuery.trim()) {
        setResults(null);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/search?query=${debouncedQuery}`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchData();
  }, [debouncedQuery]);

  const handleFocus = () => {
    setShowResults(true);
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-64 py-2 pl-10 pr-8 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {showResults && (query || results) && (
        <div className="absolute w-96 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          <SearchResults
            results={results}
            isSearching={isSearching}
            query={query}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;