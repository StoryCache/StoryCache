import "./Catalog.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Catalog = () => {
  const [catalog, setCatalog] = useState([])

  if (catalog.length === 0) {
    <div className="Catalog">Catalog is Empty</div>
  }

  async function fetchBooks() {
    try {
      const response = await fetch("/api")
      const books = await response.json();
      console.log(books)
      if (books.ok) {setCatalog(books)}
    } catch (error) {
      console.log(`Error in getCatalog ${error}`)
    }
  }

  useEffect(() => {
    console.log('useEffect in effect')
    fetchBooks()
  }, [])

  return (
    <div className="Catalog">
      <div>
        <Link to="/search">
          <button className="Search-Button">Search For A Book</button>
        </Link>
      </div>
      <h2>Catalog</h2>
      <div className="card-container">
        {catalog.map(book => (
          <div className="card" key={book.id}>
            <h3 className="title">{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors.join(", ")}</p>
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt="bookimg"
            ></img>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog
