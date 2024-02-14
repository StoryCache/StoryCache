import "./App.css"
import { useState, useEffect } from "react";
import Catalog from "./Catalog";
import { Link } from "react-router-dom";


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

  const addToCatalog = async (book) => {
    // moved this code into the try block on success
    // setCatalog([...catalog, book]);

    //fetch request to post book to user books table
    const bookData = {
      gb_id: book.id,
      isbn: book.volumeInfo.industryIdentifiers[0].identifier,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors.join(', '),
      img_url: book.volumeInfo.imageLinks.smallThumbnail,
      own: false,
      read: false,
      to_read: false,
      rating: false
    };
    console.log(bookData);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
      if (bookData.ok) {
        console.log('book added', response);
        setCatalog([...catalog, book]);
      }
    } catch (error) {
      console.error("Error adding book, ", error)
    }
  };

  return (
    <div className="App">
      <div>
      <Link to="/catalog">
        <button className="Catalog-Button">Go To Your Catalog</button>
      </Link>
      </div>
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
      <Catalog catalog={catalog} />
    </div>
  );
}

export default App
