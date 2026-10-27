import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) {
      setError('Enter a city name');
      return;
    }
    setError('');
    onSearch(input.trim());
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="search-row">
        <input
          name="city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city…"
          aria-invalid={!!error}
        />
        <button type="submit">Search</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
