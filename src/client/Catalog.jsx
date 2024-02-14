import "./Catalog.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Catalog = () => {
  const [catalog, setCatalog] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api")
      const books = await response.json()
      console.log(books)
      if (response.ok) {
        setCatalog(books)
      }
    } catch (error) {
      console.error(`Error in getCatalog ${error}`)
    }
  }

  useEffect(() => {
    console.log("useEffect in effect")
    fetchBooks()
  }, [])

  const deleteBook = async (book) => {
    //post request
    //pass in gb id as req.body
    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        gb_id: book.gb_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch("/api", options)
      const message = await response.json()
      if (response.ok) {
        fetchBooks();
        console.log(message);
      }
    } catch (error) {
      console.error(`Error in deleting book ${error}`)
    }
  }

  return (
    <div className="Catalog">
      <div>
        <Link to="/search">
          <button className="Search-Button">Search For A Book</button>
        </Link>
      </div>
      <h2>Catalog</h2>
      <div className="catalog-container">
        {catalog.length}
        {catalog.map(book => (
          <div className="card" key={book.gb_id}>
            <h3 className="title">{book.title}</h3>
            <p>{book.authors}</p>
            <img src={book.img_url} alt="bookimg"></img>
            <div>
            <button className="add-button" onClick={() => deleteBook(book)}>Delete</button>
          </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Catalog
