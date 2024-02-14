import "./App.css"
import { useState, useEffect } from "react";


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [catalog, setCatalog] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyALO2yhbqZ3qDdUmkAtsmMFsGF0V4JMkEA`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data.items); // Assuming items contain search results
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addToCatalog = (book) => {
    setCatalog([...catalog, book]);
  };

  return (
    <div className="App">
      <header>
        <h1 className="header">Search For Books</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="card-container">
        {searchResults.map((book) => (
          <div className="card" key={book.id}>
            <h2 className="title">{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors.join(', ')}</p>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="bookimg"></img>
            <div>
              <button className="add-button" onClick={() => addToCatalog(book)}>Add</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
